export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ingredients: {
        Row: {
          created_at: string;
          global_cost_per_unit: number | null;
          id: string;
          name: string;
          unit: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          global_cost_per_unit?: number | null;
          id?: string;
          name: string;
          unit: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          global_cost_per_unit?: number | null;
          id?: string;
          name?: string;
          unit?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      inventory_movements: {
        Row: {
          cost_per_unit_at_movement: number | null;
          created_at: string;
          id: string;
          ingredient_id: string;
          location_id: string;
          notes: string | null;
          quantity_change: number;
          recorded_by_staff_id: string | null;
          type: Database['public']['Enums']['inventory_movement_type'];
        };
        Insert: {
          cost_per_unit_at_movement?: number | null;
          created_at?: string;
          id?: string;
          ingredient_id: string;
          location_id: string;
          notes?: string | null;
          quantity_change: number;
          recorded_by_staff_id?: string | null;
          type: Database['public']['Enums']['inventory_movement_type'];
        };
        Update: {
          cost_per_unit_at_movement?: number | null;
          created_at?: string;
          id?: string;
          ingredient_id?: string;
          location_id?: string;
          notes?: string | null;
          quantity_change?: number;
          recorded_by_staff_id?: string | null;
          type?: Database['public']['Enums']['inventory_movement_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'inventory_movements_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inventory_movements_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inventory_movements_recorded_by_staff_id_fkey';
            columns: ['recorded_by_staff_id'];
            isOneToOne: false;
            referencedRelation: 'staff';
            referencedColumns: ['id'];
          },
        ];
      };
      inventory_stock: {
        Row: {
          created_at: string;
          id: string;
          ingredient_id: string;
          location_id: string;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          ingredient_id: string;
          location_id: string;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          ingredient_id?: string;
          location_id?: string;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inventory_stock_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inventory_stock_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      location_ingredient_costs: {
        Row: {
          cost_per_unit: number;
          created_at: string;
          id: string;
          ingredient_id: string;
          location_id: string;
          updated_at: string;
        };
        Insert: {
          cost_per_unit: number;
          created_at?: string;
          id?: string;
          ingredient_id: string;
          location_id: string;
          updated_at?: string;
        };
        Update: {
          cost_per_unit?: number;
          created_at?: string;
          id?: string;
          ingredient_id?: string;
          location_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'location_ingredient_costs_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'location_ingredient_costs_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      location_menu_items: {
        Row: {
          created_at: string;
          enabled_modifier_ids: Json | null;
          id: string;
          location_id: string;
          price: number;
          recipe_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled_modifier_ids?: Json | null;
          id?: string;
          location_id: string;
          price: number;
          recipe_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled_modifier_ids?: Json | null;
          id?: string;
          location_id?: string;
          price?: number;
          recipe_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'location_menu_items_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'location_menu_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      locations: {
        Row: {
          address: string | null;
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      modifier_options: {
        Row: {
          created_at: string;
          id: string;
          modifier_id: string;
          name: string;
          price: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          modifier_id: string;
          name: string;
          price: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          modifier_id?: string;
          name?: string;
          price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'modifier_options_modifier_id_fkey';
            columns: ['modifier_id'];
            isOneToOne: false;
            referencedRelation: 'modifiers';
            referencedColumns: ['id'];
          },
        ];
      };
      modifiers: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      recipe_ingredient_links: {
        Row: {
          created_at: string;
          id: string;
          ingredient_id: string;
          quantity: number;
          recipe_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          ingredient_id: string;
          quantity: number;
          recipe_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          ingredient_id?: string;
          quantity?: number;
          recipe_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_ingredient_links_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ingredient_links_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      recipes: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      staff: {
        Row: {
          bic: string | null;
          created_at: string;
          dob: string | null;
          iban: string | null;
          id: string;
          location_id: string;
          name: string;
          role: string | null;
          updated_at: string;
        };
        Insert: {
          bic?: string | null;
          created_at?: string;
          dob?: string | null;
          iban?: string | null;
          id?: string;
          location_id: string;
          name: string;
          role?: string | null;
          updated_at?: string;
        };
        Update: {
          bic?: string | null;
          created_at?: string;
          dob?: string | null;
          iban?: string | null;
          id?: string;
          location_id?: string;
          name?: string;
          role?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      inventory_movement_type:
        | 'waste'
        | 'restock'
        | 'sale'
        | 'adjustment'
        | 'transfer_in'
        | 'transfer_out';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      inventory_movement_type: [
        'waste',
        'restock',
        'sale',
        'adjustment',
        'transfer_in',
        'transfer_out',
      ],
    },
  },
} as const;
