import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class InventoryStock extends BaseModel<'inventory_stock'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'inventory_stock');
  }

  async findByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        ingredient (*)
      `
      )
      .eq('location_id', locationId);

    if (error) throw error;
    return data;
  }

  async findByIngredient(ingredientId: string) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*)
      `
      )
      .eq('ingredient_id', ingredientId);

    if (error) throw error;
    return data;
  }

  async findWithDetails(id: string) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*),
        ingredient (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateStock(id: string, quantityChange: number) {
    const { data, error } = await this.supabase.rpc('update_inventory_stock', {
      p_stock_id: id,
      p_quantity_change: quantityChange,
    });

    if (error) throw error;
    return data;
  }

  async findLowStock(threshold: number) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*),
        ingredient (*)
      `
      )
      .lt('quantity', threshold)
      .order('quantity', { ascending: true });

    if (error) throw error;
    return data;
  }

  async findHighStock(threshold: number) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*),
        ingredient (*)
      `
      )
      .gt('quantity', threshold)
      .order('quantity', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findStockWithMovements(days: number) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*),
        ingredient (*),
        inventory_movements!inner (
          *,
          recorded_by_staff (*)
        )
      `
      )
      .gte(
        'inventory_movements.created_at',
        new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      )
      .order('inventory_movements.created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findStockWithCosts(maxCost: number) {
    const { data, error } = await this.supabase
      .from('inventory_stock')
      .select(
        `
        *,
        location (*),
        ingredient (*),
        location_ingredient_costs!inner (
          *
        )
      `
      )
      .lt('location_ingredient_costs.cost_per_unit', maxCost)
      .order('location_ingredient_costs.cost_per_unit', { ascending: true });

    if (error) throw error;
    return data;
  }
}
