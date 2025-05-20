# Backend Database Package

This package provides database connectivity and utilities for interacting with our Supabase PostgreSQL database using TypeScript.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TypeScript (v4.5 or higher)
- Supabase account and project
- PostgreSQL client (optional, for local development)

## Installation

```bash
pnpm add @nory/backend-db
```

## Setup

1. **Environment Variables**

Create a `.env` file in your project root:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

2. **Database Configuration**

Create a database configuration file (e.g., `src/config/database.ts`):

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '@nory/backend-db';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

## Usage in Express Project

### 1. Create a Database Service

Create a service to initialize and manage database models (e.g., `src/services/database.service.ts`):

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '@nory/backend-db';
import {
  Location,
  Ingredient,
  Staff,
  Recipe,
  Modifier,
  ModifierOption,
  LocationMenuItem,
  LocationIngredientCost,
  InventoryStock,
  InventoryMovement,
} from '@nory/backend-db';

export class DatabaseService {
  private static instance: DatabaseService;
  private supabase;

  public readonly locations: Location;
  public readonly ingredients: Ingredient;
  public readonly staff: Staff;
  public readonly recipes: Recipe;
  public readonly modifiers: Modifier;
  public readonly modifierOptions: ModifierOption;
  public readonly locationMenuItems: LocationMenuItem;
  public readonly locationIngredientCosts: LocationIngredientCost;
  public readonly inventoryStock: InventoryStock;
  public readonly inventoryMovements: InventoryMovement;

  private constructor() {
    this.supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    // Initialize all models
    this.locations = new Location(this.supabase);
    this.ingredients = new Ingredient(this.supabase);
    this.staff = new Staff(this.supabase);
    this.recipes = new Recipe(this.supabase);
    this.modifiers = new Modifier(this.supabase);
    this.modifierOptions = new ModifierOption(this.supabase);
    this.locationMenuItems = new LocationMenuItem(this.supabase);
    this.locationIngredientCosts = new LocationIngredientCost(this.supabase);
    this.inventoryStock = new InventoryStock(this.supabase);
    this.inventoryMovements = new InventoryMovement(this.supabase);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
}
```

### 2. Create Express Controllers

Example of a Location controller (e.g., `src/controllers/location.controller.ts`):

```typescript
import { Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';

export class LocationController {
  private db = DatabaseService.getInstance();

  async getLocations(req: Request, res: Response) {
    try {
      const locations = await this.db.locations.findAll();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  }

  async getLocationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const location = await this.db.locations.findById(id);

      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }

      res.json(location);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch location' });
    }
  }

  async getLocationWithInventory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const location = await this.db.locations.findWithInventory(id);

      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }

      res.json(location);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch location inventory' });
    }
  }

  async createLocation(req: Request, res: Response) {
    try {
      const location = await this.db.locations.create(req.body);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create location' });
    }
  }

  async updateLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const location = await this.db.locations.update(id, req.body);
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update location' });
    }
  }

  async deleteLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.db.locations.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete location' });
    }
  }
}
```

### 3. Set Up Express Routes

Example of location routes (e.g., `src/routes/location.routes.ts`):

```typescript
import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';

const router = Router();
const locationController = new LocationController();

router.get('/', locationController.getLocations.bind(locationController));
router.get('/:id', locationController.getLocationById.bind(locationController));
router.get(
  '/:id/inventory',
  locationController.getLocationWithInventory.bind(locationController)
);
router.post('/', locationController.createLocation.bind(locationController));
router.put('/:id', locationController.updateLocation.bind(locationController));
router.delete(
  '/:id',
  locationController.deleteLocation.bind(locationController)
);

export default router;
```

### 4. Use in Express App

Example of main Express app (e.g., `src/app.ts`):

```typescript
import express from 'express';
import locationRoutes from './routes/location.routes';

const app = express();

app.use(express.json());
app.use('/api/locations', locationRoutes);

export default app;
```

## Error Handling

The package includes built-in error handling, but you should implement proper error handling in your Express application:

```typescript
// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error.name === 'PostgrestError') {
    return res.status(400).json({
      error: 'Database error',
      details: error.message,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
  });
}

// Use in app.ts
app.use(errorHandler);
```

## Type Safety

The package provides full TypeScript support. You can use the types in your Express application:

```typescript
import { Database } from '@nory/backend-db';

// Use in request handlers
async function createLocation(
  req: Request<{}, {}, Database['public']['Tables']['locations']['Insert']>,
  res: Response
) {
  // Type-safe request body
  const locationData = req.body;
  // ...
}
```

## Best Practices

1. Use the singleton pattern for database service to avoid multiple connections
2. Implement proper error handling middleware
3. Use TypeScript types for request/response bodies
4. Implement input validation
5. Use environment variables for configuration
6. Implement proper logging
7. Use transactions for complex operations
8. Implement proper authentication and authorization

## Contributing

1. Create a new branch for your changes
2. Write tests for new functionality
3. Update documentation as needed
4. Ensure all TypeScript types are properly defined
5. Submit a pull request

## License

[Your License Here]
