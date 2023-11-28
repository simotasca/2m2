export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string
          customer_id: string | null
          id: number
          ip: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: number
          ip?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: number
          ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_products: {
        Row: {
          created_at: string
          id: number
          id_cart: number
          id_product: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_cart: number
          id_product: string
        }
        Update: {
          created_at?: string
          id?: number
          id_cart?: number
          id_product?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_products_id_cart_fkey"
            columns: ["id_cart"]
            referencedRelation: "cart"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email?: string
          id: string
          stripe_customer?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

