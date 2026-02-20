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
            profiles: {
                Row: {
                    id: string
                    telegram_id: string
                    username: string | null
                    subscription_tier: 'free' | 'pro' | 'alpha'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    telegram_id: string
                    username?: string | null
                    subscription_tier?: 'free' | 'pro' | 'alpha'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    telegram_id?: string
                    username?: string | null
                    subscription_tier?: 'free' | 'pro' | 'alpha'
                    created_at?: string
                    updated_at?: string
                }
            }
            watchlists: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            alerts: {
                Row: {
                    id: string
                    agent_id: string
                    symbol: string
                    price: number
                    change_percent: number | null
                    confidence: number | null
                    thesis: string
                    key_levels: Json | null
                    risk_factors: Json | null
                    outcome_status: 'ignored' | 'watched' | 'acted' | 'acted_outcome'
                    is_delivered: boolean
                    delivered_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    agent_id: string
                    symbol: string
                    price: number
                    change_percent?: number | null
                    confidence?: number | null
                    thesis: string
                    key_levels?: Json | null
                    risk_factors?: Json | null
                    outcome_status?: 'ignored' | 'watched' | 'acted' | 'acted_outcome'
                    is_delivered?: boolean | null
                    delivered_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    agent_id?: string
                    symbol?: string
                    price?: number
                    change_percent?: number | null
                    confidence?: number | null
                    thesis?: string
                    key_levels?: Json | null
                    risk_factors?: Json | null
                    outcome_status?: 'ignored' | 'watched' | 'acted' | 'acted_outcome'
                    is_delivered?: boolean
                    delivered_at?: string | null
                    created_at?: string
                }
            }
            agents: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    configuration: Json
                    status: 'active' | 'off'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    configuration: Json
                    status?: 'active' | 'off'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    configuration?: Json
                    status?: 'active' | 'off'
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
