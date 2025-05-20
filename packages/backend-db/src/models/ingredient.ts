import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

type IngredientRow = Database['public']['Tables']['ingredients']['Row'];
type RecipeRow = Database['public']['Tables']['recipes']['Row'];
type LocationRow = Database['public']['Tables']['locations']['Row'];
type InventoryMovementRow =
  Database['public']['Tables']['inventory_movements']['Row'];
type RecipeIngredientLinkRow =
  Database['public']['Tables']['recipe_ingredient_links']['Row'];
type LocationIngredientCostRow =
  Database['public']['Tables']['location_ingredient_costs']['Row'];

interface RecipeLink extends RecipeIngredientLinkRow {
  recipe: RecipeRow;
}

interface LocationCost extends LocationIngredientCostRow {
  location: LocationRow;
}

export class Ingredient extends BaseModel<'ingredients'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'ingredients');
  }

  async findByName(name: string): Promise<IngredientRow | null> {
    const { data, error } = await this.supabase
      .from('ingredients')
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithRecipes(
    id: string
  ): Promise<(IngredientRow & { recipes: RecipeRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('ingredients')
      .select(
        `
        *,
        recipe_ingredient_links (
          recipe:recipes (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      recipes: (data.recipe_ingredient_links as RecipeLink[]).map(
        (link) => link.recipe
      ),
    };
  }

  async findWithLocations(
    id: string
  ): Promise<(IngredientRow & { locations: LocationRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('ingredients')
      .select(
        `
        *,
        location_ingredient_costs (
          location:locations (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      locations: (data.location_ingredient_costs as LocationCost[]).map(
        (cost) => cost.location
      ),
    };
  }

  async findWithMovements(
    id: string
  ): Promise<(IngredientRow & { movements: InventoryMovementRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('ingredients')
      .select(
        `
        *,
        inventory_movements (
          *,
          location:locations (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      movements: data.inventory_movements,
    };
  }
}
