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
      greeting: {
        Row: {
          body: string | null
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
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

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never