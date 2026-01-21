import { z } from 'zod';

/**
 * Zod validation schema for account form inputs.
 * 
 * We validate that followerCount is non-negative because negative values don't
 * make sense in the context of social media metrics. The platform is required
 * to ensure we know which social network the account belongs to.
 */
export const accountSchema = z.object({
  platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'], {
    required_error: 'Platform is required',
  }),
  username: z.string().min(1, 'Username is required'),
  displayName: z.string().min(1, 'Display name is required'),
  avatarUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  followerCount: z
    .number({
      required_error: 'Follower count is required',
      invalid_type_error: 'Follower count must be a number',
    })
    .nonnegative('Follower count cannot be negative')
    .int('Follower count must be a whole number')
    .optional(),
});

/**
 * Inferred TypeScript type from the Zod schema.
 * 
 * This gives us type safety when using the form values with React Hook Form.
 * The type automatically updates if we change the schema, ensuring consistency
 * between validation rules and TypeScript types.
 */
export type AccountFormValues = z.infer<typeof accountSchema>;
