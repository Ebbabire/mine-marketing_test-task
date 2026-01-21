import { z } from 'zod';
// import type { SocialPlatform } from '../../types';

/**
 * Zod validation schemas for form inputs.
 * 
 * We use Zod here instead of Yup because it has better TypeScript inference
 * and works seamlessly with React Hook Form via @hookform/resolvers.
 * The schemas serve dual purpose: runtime validation and type generation.
 */

/**
 * Schema for creating/editing a social media post.
 * 
 * Note: We allow empty content initially because users might want to schedule
 * a post with just media. However, we enforce that at least content OR media
 * must be provided in the final validation.
 */
export const createPostSchema = z
  .object({
    accountId: z.string().min(1, 'Please select a social account'),
    platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok']),
    content: z.string().max(5000, 'Content must be less than 5000 characters'),
    mediaUrls: z.array(z.string().url('Invalid media URL')).optional(),
    scheduledFor: z
      .string()
      .datetime('Invalid date format')
      .optional()
      .refine(
        (date) => {
          if (!date) return true;
          return new Date(date) > new Date();
        },
        { message: 'Scheduled date must be in the future' }
      ),
  })
  .refine(
    (data) => data.content.trim().length > 0 || (data.mediaUrls && data.mediaUrls.length > 0),
    {
      message: 'Post must have either content or media',
      path: ['content'],
    }
  );

export type CreatePostInput = z.infer<typeof createPostSchema>;

/**
 * Schema for connecting a new social account.
 * 
 * We validate the platform separately because each platform has different
 * connection requirements (OAuth tokens, API keys, etc.). This schema
 * handles the initial form submission before platform-specific validation.
 */
export const connectAccountSchema = z.object({
  platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok']),
  username: z.string().min(1, 'Username is required'),
  accessToken: z.string().min(1, 'Access token is required'),
});

export type ConnectAccountInput = z.infer<typeof connectAccountSchema>;
