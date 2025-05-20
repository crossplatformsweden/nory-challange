import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
type TableInsert<T extends TableName> =
  Database['public']['Tables'][T]['Insert'];
type TableUpdate<T extends TableName> =
  Database['public']['Tables'][T]['Update'];

export class BaseModel<T extends TableName> {
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
    if (!data) return null;
    return data as unknown as TableRow<T>;
  }

  async findAll(): Promise<TableRow<T>[]> {
    const { data, error } = await this.supabase.from(this.table).select('*');

    if (error) throw error;
    if (!data) return [];
    return data as unknown as TableRow<T>[];
  }

  async create(values: TableInsert<T>): Promise<TableRow<T>> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert([values] as any)
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
      .update([values] as any)
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
