import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const TABLE_NAMES = [
  'ingredients',
  'inventory_movements',
  'inventory_stock',
  'location_ingredient_costs',
  'location_menu_items',
  'locations',
  'modifier_options',
  'modifiers',
  'recipe_ingredient_links',
  'recipes',
  'staff',
] as const;
type TableNameWithId = {
  [K in (typeof TABLE_NAMES)[number]]: Database['public']['Tables'][K]['Row'] extends {
    id: string;
  }
    ? K
    : never;
}[(typeof TABLE_NAMES)[number]];
type TableRow<T extends TableNameWithId> =
  Database['public']['Tables'][T]['Row'] & { id: string };
type TableInsert<T extends TableNameWithId> =
  Database['public']['Tables'][T]['Insert'];
type TableUpdate<T extends TableNameWithId> =
  Database['public']['Tables'][T]['Update'];

export class BaseModel<T extends TableNameWithId> {
  protected table: T;
  protected supabase: SupabaseClient<Database>;

  constructor(supabase: SupabaseClient<Database>, table: T) {
    this.supabase = supabase;
    this.table = table;
  }

  async findById(id: string): Promise<TableRow<T> | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id' as any, id)
      .single();

    if (error) throw error;
    return data as unknown as TableRow<T> | null;
  }

  async findAll(): Promise<TableRow<T>[]> {
    const { data, error } = await this.supabase.from(this.table).select('*');

    if (error) throw error;
    return (data ?? []) as unknown as TableRow<T>[];
  }

  async create(values: TableInsert<T>): Promise<TableRow<T>> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(values as any)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from insert');
    return data as unknown as TableRow<T>;
  }

  async update(
    id: string,
    values: Partial<TableUpdate<T>>
  ): Promise<TableRow<T>> {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(values as any)
      .eq('id' as any, id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from update');
    return data as unknown as TableRow<T>;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.table)
      .delete()
      .eq('id' as any, id);

    if (error) throw error;
  }
}
