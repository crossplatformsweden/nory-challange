-- Ensure UUID generation function is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--
-- TYPES
--
CREATE TYPE inventory_movement_type AS ENUM('waste', 'restock', 'sale', 'adjustment', 'transfer_in', 'transfer_out');

--
-- TABLES
--

-- Table: locations
-- Represents a physical location (restaurant, etc.).
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE, -- Assuming location names should be unique
    address VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE locations IS 'Physical locations like restaurants.';
COMMENT ON COLUMN locations.id IS 'Unique identifier for the location (UUID).';
COMMENT ON COLUMN locations.name IS 'The name of the location (must be unique).';
COMMENT ON COLUMN locations.address IS 'The physical address of the location.';
COMMENT ON COLUMN locations.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN locations.updated_at IS 'Timestamp when the record was last updated.';

-- Table: ingredients
-- Represents a definition of an item that can be stocked (e.g., "Coffee Beans", "Milk").
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE, -- Ingredient names should be unique globally
    unit VARCHAR(50) NOT NULL, -- Standard unit of measurement (e.g., kg, liter, pieces)
    -- Global cost is optional; location-specific cost overrides this
    global_cost_per_unit NUMERIC(20, 9) DEFAULT NULL CHECK (global_cost_per_unit >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ingredients IS 'Definitions of inventory items.';
COMMENT ON COLUMN ingredients.id IS 'Unique identifier for the ingredient definition (UUID).';
COMMENT ON COLUMN ingredients.name IS 'The name of the ingredient (must be unique).';
COMMENT ON COLUMN ingredients.unit IS 'The standard unit of measurement for this item.';
COMMENT ON COLUMN ingredients.global_cost_per_unit IS 'The average cost per unit globally or default if location-specific cost not set.';
COMMENT ON COLUMN ingredients.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN ingredients.updated_at IS 'Timestamp when the record was last updated.';

-- Table: staff
-- Represents a staff member, associated with a location.
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE, -- Staff belongs to a location
    name VARCHAR(255) NOT NULL,
    dob DATE DEFAULT NULL,
    role VARCHAR(100) DEFAULT NULL,
    iban TEXT DEFAULT NULL, -- Using TEXT for potentially long/variable bank details
    bic TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE staff IS 'Staff members at locations.';
COMMENT ON COLUMN staff.id IS 'Unique identifier for the staff member (UUID).';
COMMENT ON COLUMN staff.location_id IS 'The ID of the location where the staff member primarily works.';
COMMENT ON COLUMN staff.name IS 'The full name of the staff member.';
COMMENT ON COLUMN staff.dob IS 'Date of birth.';
COMMENT ON COLUMN staff.role IS 'The role or position of the staff member.';
COMMENT ON COLUMN staff.iban IS 'Staff member''s IBAN for payroll.';
COMMENT ON COLUMN staff.bic IS 'Staff member''s BIC/SWIFT code.';
COMMENT ON COLUMN staff.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN staff.updated_at IS 'Timestamp when the record was last updated.';
CREATE INDEX idx_staff_location_id ON staff (location_id);

-- Table: recipes
-- Represents a definition of a menu item or product that uses ingredients.
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE, -- Recipe names should be unique globally
    description VARCHAR(1000) DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE recipes IS 'Definitions of recipes.';
COMMENT ON COLUMN recipes.id IS 'Unique identifier for the recipe definition (UUID).';
COMMENT ON COLUMN recipes.name IS 'The name of the recipe (must be unique).';
COMMENT ON COLUMN recipes.description IS 'A description of the recipe.';
COMMENT ON COLUMN recipes.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN recipes.updated_at IS 'Timestamp when the record was last updated.';

-- Table: recipe_ingredient_links
-- Links a recipe to an ingredient, specifying the required quantity for one serving/unit of the recipe.
CREATE TABLE recipe_ingredient_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE, -- If recipe deleted, links are deleted
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT, -- Cannot delete ingredient if used in a recipe
    quantity NUMERIC(20, 9) NOT NULL CHECK (quantity >= 0), -- Quantity must be non-negative
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (recipe_id, ingredient_id) -- An ingredient can only be linked once per recipe
);
COMMENT ON TABLE recipe_ingredient_links IS 'Links recipes to ingredients and specifies required quantities.';
COMMENT ON COLUMN recipe_ingredient_links.id IS 'Unique identifier for the link (UUID).';
COMMENT ON COLUMN recipe_ingredient_links.recipe_id IS 'The ID of the recipe this link belongs to.';
COMMENT ON COLUMN recipe_ingredient_links.ingredient_id IS 'The ID of the required ingredient.';
COMMENT ON COLUMN recipe_ingredient_links.quantity IS 'The quantity of the ingredient required per unit of the recipe.';
COMMENT ON COLUMN recipe_ingredient_links.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN recipe_ingredient_links.updated_at IS 'Timestamp when the record was last updated.';
CREATE INDEX idx_recipe_ingredient_links_recipe_id ON recipe_ingredient_links (recipe_id);
CREATE INDEX idx_recipe_ingredient_links_ingredient_id ON recipe_ingredient_links (ingredient_id);

-- Table: modifiers
-- Represents a group of recipe options (e.g., "Milk Options", "Sweeteners").
CREATE TABLE modifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE, -- Modifier group names should be unique globally
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE modifiers IS 'Groups of recipe options.';
COMMENT ON COLUMN modifiers.id IS 'Unique identifier for the modifier group (UUID).';
COMMENT ON COLUMN modifiers.name IS 'The name of the modifier group (must be unique).';
COMMENT ON COLUMN modifiers.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN modifiers.updated_at IS 'Timestamp when the record was last updated.';

-- Table: modifier_options
-- Represents a single choice within a modifier group (e.g., "Oat Milk" within "Milk Options").
CREATE TABLE modifier_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    modifier_id UUID NOT NULL REFERENCES modifiers(id) ON DELETE CASCADE, -- If modifier group deleted, options are deleted
    name VARCHAR(255) NOT NULL,
    price NUMERIC(20, 9) NOT NULL CHECK (price >= 0), -- Price must be non-negative
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (modifier_id, name) -- Option name must be unique within a modifier group
);
COMMENT ON TABLE modifier_options IS 'Individual options within modifier groups.';
COMMENT ON COLUMN modifier_options.id IS 'Unique identifier for the modifier option (UUID).';
COMMENT ON COLUMN modifier_options.modifier_id IS 'The ID of the modifier group this option belongs to.';
COMMENT ON COLUMN modifier_options.name IS 'The name of the modifier option.';
COMMENT ON COLUMN modifier_options.price IS 'The additional cost associated with choosing this option.';
COMMENT ON COLUMN modifier_options.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN modifier_options.updated_at IS 'Timestamp when the record was last updated.';
CREATE INDEX idx_modifier_options_modifier_id ON modifier_options (modifier_id);

-- Table: location_menu_items
-- Links a specific recipe to a specific location as a menu item.
CREATE TABLE location_menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE, -- If location deleted, menu items are deleted
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE RESTRICT, -- Cannot delete recipe if it's a menu item somewhere
    price NUMERIC(20, 9) NOT NULL CHECK (price >= 0), -- Price must be non-negative
    -- Stores an array of Modifier IDs available for this menu item.
    -- Uses JSONB for better querying/indexing capabilities than JSON.
    enabled_modifier_ids JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (location_id, recipe_id) -- A recipe can only be one menu item per location
);
COMMENT ON TABLE location_menu_items IS 'Links recipes to locations as menu items.';
COMMENT ON COLUMN location_menu_items.id IS 'Unique identifier for the menu item link (UUID).';
COMMENT ON COLUMN location_menu_items.location_id IS 'The ID of the location where this menu item is available.';
COMMENT ON COLUMN location_menu_items.recipe_id IS 'The ID of the recipe this menu item is based on.';
COMMENT ON COLUMN location_menu_items.price IS 'The price of the menu item at this location.';
COMMENT ON COLUMN location_menu_items.enabled_modifier_ids IS 'A JSONB array of Modifier IDs whose options are available for this menu item.';
COMMENT ON COLUMN location_menu_items.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN location_menu_items.updated_at IS 'Timestamp when the record was last updated.';
CREATE INDEX idx_location_menu_items_location_id ON location_menu_items (location_id);
CREATE INDEX idx_location_menu_items_recipe_id ON location_menu_items (recipe_id);

-- Table: location_ingredient_costs
-- Represents a location-specific cost for an ingredient, overriding the global ingredient cost.
CREATE TABLE location_ingredient_costs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE, -- If location deleted, costs are deleted
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT, -- Cannot delete ingredient if it has location costs
    cost_per_unit NUMERIC(20, 9) NOT NULL CHECK (cost_per_unit >= 0), -- Cost must be non-negative
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (location_id, ingredient_id) -- An ingredient can only have one specific cost per location
);
COMMENT ON TABLE location_ingredient_costs IS 'Location-specific costs for ingredients.';
COMMENT ON COLUMN location_ingredient_costs.id IS 'Unique identifier for the cost record (UUID).';
COMMENT ON COLUMN location_ingredient_costs.location_id IS 'The ID of the location.';
COMMENT ON COLUMN location_ingredient_costs.ingredient_id IS 'The ID of the ingredient.';
COMMENT ON COLUMN location_ingredient_costs.cost_per_unit IS 'The specific cost per unit of the ingredient at this location.';
COMMENT ON COLUMN location_ingredient_costs.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN location_ingredient_costs.updated_at IS 'Timestamp when the record was last updated.';
CREATE INDEX idx_location_ingredient_costs_location_id ON location_ingredient_costs (location_id);
CREATE INDEX idx_location_ingredient_costs_ingredient_id ON location_ingredient_costs (ingredient_id);

-- Table: inventory_stock
-- Represents the current quantity of a specific ingredient at a specific location.
CREATE TABLE inventory_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE, -- If location deleted, stock is deleted
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT, -- Cannot delete ingredient if it has stock somewhere
    quantity NUMERIC(20, 9) NOT NULL CHECK (quantity >= 0), -- Quantity must be non-negative
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- When the stock record was first created (initial setup)
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Timestamp when the stock quantity was last updated
    UNIQUE (location_id, ingredient_id) -- An ingredient can only have one stock record per location
);
COMMENT ON TABLE inventory_stock IS 'Current inventory stock levels at locations.';
COMMENT ON COLUMN inventory_stock.id IS 'Unique identifier for the stock record (UUID).';
COMMENT ON COLUMN inventory_stock.location_id IS 'The ID of the location where the stock is held.';
COMMENT ON COLUMN inventory_stock.ingredient_id IS 'The ID of the ingredient.';
COMMENT ON COLUMN inventory_stock.quantity IS 'The current quantity of the ingredient at this location in its standard unit.';
COMMENT ON COLUMN inventory_stock.created_at IS 'Timestamp when the stock record was first created.';
COMMENT ON COLUMN inventory_stock.updated_at IS 'Timestamp when the stock quantity was last updated.';
CREATE INDEX idx_inventory_stock_location_id ON inventory_stock (location_id);
CREATE INDEX idx_inventory_stock_ingredient_id ON inventory_stock (ingredient_id);

-- Table: inventory_movements
-- Represents a log of changes to inventory stock (e.g., sale, waste, restock).
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE RESTRICT, -- Keep movement history even if location deleted? RESTRICT prevents deletion. Or SET NULL? Let's RESTRICT for safety.
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT, -- Cannot delete ingredient if it has movement history
    quantity_change NUMERIC(20, 9) NOT NULL, -- The change in quantity (positive for additions, negative for removals)
    type inventory_movement_type NOT NULL,
    notes TEXT DEFAULT NULL,
    -- Store cost per unit AT THE TIME of the movement for accurate historical cost analysis.
    cost_per_unit_at_movement NUMERIC(20, 9) DEFAULT NULL CHECK (cost_per_unit_at_movement >= 0), -- Cost could be unknown or N/A for some types (like waste)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Timestamp when the movement was recorded
    recorded_by_staff_id UUID DEFAULT NULL REFERENCES staff(id) ON DELETE SET NULL -- If staff deleted, movement record remains, link is severed.
);
COMMENT ON TABLE inventory_movements IS 'Log of inventory stock changes.';
COMMENT ON COLUMN inventory_movements.id IS 'Unique identifier for the movement record (UUID).';
COMMENT ON COLUMN inventory_movements.location_id IS 'The ID of the location where the movement occurred.';
COMMENT ON COLUMN inventory_movements.ingredient_id IS 'The ID of the ingredient affected.';
COMMENT ON COLUMN inventory_movements.quantity_change IS 'The change in quantity (positive for additions, negative for removals) in the ingredient''s standard unit.';
COMMENT ON COLUMN inventory_movements.type IS 'The type of inventory movement (waste, restock, sale, etc.).';
COMMENT ON COLUMN inventory_movements.notes IS 'Optional notes about the movement.';
COMMENT ON COLUMN inventory_movements.cost_per_unit_at_movement IS 'The cost per unit of the ingredient at the time of this movement for cost analysis.';
COMMENT ON COLUMN inventory_movements.created_at IS 'Timestamp when the movement was recorded.';
COMMENT ON COLUMN inventory_movements.recorded_by_staff_id IS 'The ID of the staff member who recorded the movement, if applicable.';
CREATE INDEX idx_inventory_movements_location_id ON inventory_movements (location_id);
CREATE INDEX idx_inventory_movements_ingredient_id ON inventory_movements (ingredient_id);
CREATE INDEX idx_inventory_movements_type ON inventory_movements (type);
CREATE INDEX idx_inventory_movements_created_at ON inventory_movements (created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER ingredients_updated_at BEFORE UPDATE ON ingredients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER recipes_updated_at BEFORE UPDATE ON recipes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER recipe_ingredient_links_updated_at BEFORE UPDATE ON recipe_ingredient_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER modifiers_updated_at BEFORE UPDATE ON modifiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER modifier_options_updated_at BEFORE UPDATE ON modifier_options FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER location_menu_items_updated_at BEFORE UPDATE ON location_menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER location_ingredient_costs_updated_at BEFORE UPDATE ON location_ingredient_costs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER inventory_stock_updated_at BEFORE UPDATE ON inventory_stock FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
