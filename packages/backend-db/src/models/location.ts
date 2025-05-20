import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

type LocationRow = Database['public']['Tables']['locations']['Row'];
type LocationMenuItemRow =
  Database['public']['Tables']['location_menu_items']['Row'];
type InventoryStockRow = Database['public']['Tables']['inventory_stock']['Row'];
type LocationIngredientCostRow =
  Database['public']['Tables']['location_ingredient_costs']['Row'];
type InventoryMovementRow =
  Database['public']['Tables']['inventory_movements']['Row'];

export class Location extends BaseModel<'locations'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'locations');
  }

  async findByName(name: string) {
    const { data, error } = await this.supabase
      .from('locations')
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithStaff(id: string) {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        staff (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithMenuItems(
    id: string
  ): Promise<(LocationRow & { menu_items: LocationMenuItemRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        location_menu_items (
          *,
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
      menu_items: data.location_menu_items,
    };
  }

  async findWithInventory(id: string): Promise<
    | (LocationRow & {
        inventory: InventoryStockRow[];
        ingredient_costs: LocationIngredientCostRow[];
      })
    | null
  > {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        inventory_stock (
          *,
          ingredient:ingredients (*)
        ),
        location_ingredient_costs (
          *,
          ingredient:ingredients (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      inventory: data.inventory_stock,
      ingredient_costs: data.location_ingredient_costs,
    };
  }

  async findWithLowStock(
    id: string,
    threshold: number
  ): Promise<(LocationRow & { low_stock: InventoryStockRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        inventory_stock!inner (
          *,
          ingredient:ingredients (*)
        )
      `
      )
      .eq('id', id)
      .lt('inventory_stock.quantity', threshold)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      low_stock: data.inventory_stock,
    };
  }

  async findWithExpensiveIngredients(
    id: string,
    threshold: number
  ): Promise<
    | (LocationRow & { expensive_ingredients: LocationIngredientCostRow[] })
    | null
  > {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        location_ingredient_costs!inner (
          *,
          ingredient:ingredients (*)
        )
      `
      )
      .eq('id', id)
      .gt('location_ingredient_costs.cost', threshold)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      expensive_ingredients: data.location_ingredient_costs,
    };
  }

  async findWithPopularMenuItems(
    id: string,
    limit: number
  ): Promise<(LocationRow & { popular_items: LocationMenuItemRow[] }) | null> {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        location_menu_items (
          *,
          recipe:recipes (*)
        )
      `
      )
      .eq('id', id)
      .order('location_menu_items.sales_count', { ascending: false })
      .limit(limit)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      popular_items: data.location_menu_items,
    };
  }

  async findWithRecentMovements(
    id: string,
    limit: number
  ): Promise<
    (LocationRow & { recent_movements: InventoryMovementRow[] }) | null
  > {
    const { data, error } = await this.supabase
      .from('locations')
      .select(
        `
        *,
        inventory_movements (
          *,
          ingredient:ingredients (*),
          recorded_by_staff:staff (*)
        )
      `
      )
      .eq('id', id)
      .order('inventory_movements.created_at', { ascending: false })
      .limit(limit)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      recent_movements: data.inventory_movements,
    };
  }
}
