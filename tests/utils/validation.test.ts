import { describe, expect, it } from 'vitest';
import { accountSchema } from '../../src/utils/validation';

describe('accountSchema', () => {
  it('accepts a valid payload', () => {
    const result = accountSchema.safeParse({
      platform: 'facebook',
      username: 'mybrand',
      displayName: 'My Brand',
      avatarUrl: 'https://example.com/avatar.png',
      followerCount: 12000,
    });

    expect(result.success).toBe(true);
  });

  it('rejects negative followerCount', () => {
    const result = accountSchema.safeParse({
      platform: 'instagram',
      username: 'mybrand',
      displayName: 'My Brand',
      followerCount: -1,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('cannot be negative');
    }
  });

  it('rejects invalid avatarUrl when provided', () => {
    const result = accountSchema.safeParse({
      platform: 'linkedin',
      username: 'mybrand',
      displayName: 'My Brand',
      avatarUrl: 'not-a-url',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('Invalid URL');
    }
  });
});

