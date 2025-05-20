import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class Staff extends BaseModel<'staff'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'staff');
  }

  async findByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('staff')
      .select('*')
      .eq('location_id', locationId);

    if (error) throw error;
    return data;
  }

  async findWithLocation(id: string) {
    const { data, error } = await this.supabase
      .from('staff')
      .select(
        `
        *,
        location (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithMovements(id: string) {
    const { data, error } = await this.supabase
      .from('staff')
      .select(
        `
        *,
        inventory_movements (
          *,
          ingredient (*),
          location (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
