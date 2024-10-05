export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_categories: {
        Row: {
          book_id: string
          category_id: string
        }
        Insert: {
          book_id: string
          category_id: string
        }
        Update: {
          book_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_categories_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      book_subcategories: {
        Row: {
          book_id: string
          subcategory_id: string
        }
        Insert: {
          book_id: string
          subcategory_id: string
        }
        Update: {
          book_id?: string
          subcategory_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_subcategories_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_subcategories_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          cover_type_id: string
          created_at: string
          description: string
          discount: number
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          editor: string
          id: string
          isbn: string
          name: string
          page_count: number
          price: number
          price_usd: number
          release_year: number
          share_house: string
          status: Database["public"]["Enums"]["status_enum"] | null
          stock: number
          title: string
          updated_at: string
          weight: number
          writer_id: string
        }
        Insert: {
          cover_type_id: string
          created_at?: string
          description?: string
          discount: number
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          editor?: string
          id?: string
          isbn?: string
          name?: string
          page_count: number
          price: number
          price_usd: number
          release_year: number
          share_house?: string
          status?: Database["public"]["Enums"]["status_enum"] | null
          stock: number
          title?: string
          updated_at?: string
          weight: number
          writer_id: string
        }
        Update: {
          cover_type_id?: string
          created_at?: string
          description?: string
          discount?: number
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          editor?: string
          id?: string
          isbn?: string
          name?: string
          page_count?: number
          price?: number
          price_usd?: number
          release_year?: number
          share_house?: string
          status?: Database["public"]["Enums"]["status_enum"] | null
          stock?: number
          title?: string
          updated_at?: string
          weight?: number
          writer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_cover_type_id_fkey"
            columns: ["cover_type_id"]
            isOneToOne: false
            referencedRelation: "cover_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "writers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      cover_types: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      kysely_migration: {
        Row: {
          name: string
          timestamp: string
        }
        Insert: {
          name: string
          timestamp: string
        }
        Update: {
          name?: string
          timestamp?: string
        }
        Relationships: []
      }
      kysely_migration_lock: {
        Row: {
          id: string
          is_locked: number
        }
        Insert: {
          id: string
          is_locked?: number
        }
        Update: {
          id?: string
          is_locked?: number
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string
          created_at: string
          email: string
          first_name: string
          last_name: string
          roles: Database["public"]["Enums"]["roles_enum"][]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string
          created_at?: string
          email: string
          first_name?: string
          last_name?: string
          roles?: Database["public"]["Enums"]["roles_enum"][]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          roles?: Database["public"]["Enums"]["roles_enum"][]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      writers: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discount_type_enum: "percentage" | "unavailable"
      roles_enum: "user" | "admin"
      status_enum: "available" | "fixed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
