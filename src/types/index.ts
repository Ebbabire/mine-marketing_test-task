

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  displayName: string;
  avatarUrl?: string;
  isConnected: boolean;
  connectedAt?: string;
  followerCount: number;
}


export interface AnalyticsData {
  name: string;
  followers: number;
  engagement: number;
}
