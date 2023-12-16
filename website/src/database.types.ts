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
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: number
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
      municipality: {
        Row: {
          created_at: string
          id: number
          id_province: number
          istat: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_province: number
          istat: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          id_province?: number
          istat?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "municipality_id_province_fkey"
            columns: ["id_province"]
            referencedRelation: "province"
            referencedColumns: ["id"]
          }
        ]
      }
      nation: {
        Row: {
          code: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      province: {
        Row: {
          code: string
          created_at: string
          id: number
          id_region: number
          istat: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          id_region: number
          istat: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          id_region?: number
          istat?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "province_id_region_fkey"
            columns: ["id_region"]
            referencedRelation: "region"
            referencedColumns: ["id"]
          }
        ]
      }
      region: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

