import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class InventoryMovement extends BaseModel<'inventory_movements'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'inventory_movements');
  }

  async findByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('inventory_movements')
      .select(
        `
        *,
        ingredient (*),
        recorded_by_staff (*)
      `
      )
      .eq('location_id', locationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findByIngredient(ingredientId: string) {
    const { data, error } = await this.supabase
      .from('inventory_movements')
      .select(
        `
        *,
        location (*),
        recorded_by_staff (*)
      `
      )
      .eq('ingredient_id', ingredientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findByStaff(staffId: string) {
    const { data, error } = await this.supabase
      .from('inventory_movements')
      .select(
        `
        *,
        ingredient (*),
        location (*)
      `
      )
      .eq('recorded_by_staff_id', staffId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findWithDetails(id: string) {
    const { data, error } = await this.supabase
      .from('inventory_movements')
      .select(
        `
        *,
        location (*),
        ingredient (*),
        recorded_by_staff (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async findByType(
    type: Database['public']['Enums']['inventory_movement_type']
  ) {
    const { data, error } = await this.supabase
      .from('inventory_movements')
      .select(
        `
        *,
        location (*),
        ingredient (*),
        recorded_by_staff (*)
      `
      )
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
