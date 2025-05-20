import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class LocationIngredientCost extends BaseModel<'location_ingredient_costs'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'location_ingredient_costs');
  }

  async findByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('location_ingredient_costs')
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
      .from('location_ingredient_costs')
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
      .from('location_ingredient_costs')
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
}
