import { z } from 'zod';

// Zod validation schema for account form inputs.
 
export const accountSchema = z.object({
  
  platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'] as const, {
    message: 'Platform is required',
  }),
  username: z.string().min(1, 'Username is required'),
  displayName: z.string().min(1, 'Display name is required'),
  avatarUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  followerCount: z
    .number({ message: 'Follower count must be a number' })
    .nonnegative('Follower count cannot be negative')
    .int('Follower count must be a whole number')
    .optional(),
});


export type AccountFormValues = z.infer<typeof accountSchema>;
