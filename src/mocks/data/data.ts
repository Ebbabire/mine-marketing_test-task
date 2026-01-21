import type {  AnalyticsData, SocialAccount } from '../../types';

// Mock data for development and testing.
export const mockAccounts: SocialAccount[] = [
  {
    id: 'acc-1',
    platform: 'facebook',
    username: 'mybrand',
    displayName: 'My Brand',
    avatarUrl: 'https://picsum.photos/seed/a1/100/100',
    isConnected: true,
    connectedAt: '2024-01-15T10:00:00Z',
    followerCount: 12500,
  },
  { id: 'acc-2', platform: 'tiktok', username: 'mybrand', followerCount: 156000,  avatarUrl: 'https://picsum.photos/seed/a4/100/100', isConnected: true, connectedAt: '2024-02-01T09:15:00Z', displayName: 'Alex Vibe' },
  
  {
    id: 'acc-3',
    platform: 'instagram',
    username: 'mybrand',
    displayName: 'My Brand',
    avatarUrl: 'https://picsum.photos/seed/a2/100/100',
    isConnected: true,
    connectedAt: '2024-02-01T09:15:00Z',
    followerCount: 15200,
  },
  { id: 'acc-4', platform: 'linkedin', username: 'mybrand', followerCount: 4800,  avatarUrl: 'https://picsum.photos/seed/a3/100/100', isConnected: true, connectedAt: '2024-02-01T09:15:00Z', displayName: 'Alex Rivera' },

];


export const MOCK_ANALYTICS: AnalyticsData[] = [
  { name: 'Mon', followers: 1200, engagement: 2400 },
  { name: 'Tue', followers: 1900, engagement: 1398 },
  { name: 'Wed', followers: 3000, engagement: 9800 },
  { name: 'Thu', followers: 2780, engagement: 3908 },
  { name: 'Fri', followers: 1890, engagement: 4800 },
  { name: 'Sat', followers: 2390, engagement: 3800 },
  { name: 'Sun', followers: 3490, engagement: 4300 },
];