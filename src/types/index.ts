export interface WeirAlert {
  id: string
  user_id: string
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'X'
  content_url: string
  thumbnail_description: string
  match_confidence: number
  status: 'pending' | 'monetized' | 'takedown_requested' | 'resolved'
  estimated_cpm: number
  detected_at: string
  created_at: string
  deleted_at: string | null
}

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  creator_handle: string
  monitored_platforms: string[]
  plan: 'free' | 'creator' | 'pro'
  created_at: string
  deleted_at: string | null
}

export interface WeirEarning {
  id: string
  user_id: string
  alert_id: string
  amount: number
  currency: string
  platform: string
  period_start: string
  period_end: string
  status: 'pending' | 'paid'
  created_at: string
}

export interface SeedAlert {
  id: string
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'X'
  content_url: string
  thumbnail_description: string
  match_confidence: number
  status: 'pending' | 'monetized' | 'takedown_requested' | 'resolved'
  estimated_cpm: number
  detected_at: string
}
