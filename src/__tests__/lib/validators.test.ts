import { describe, it, expect } from 'vitest';
import { partySchema, scopeSchema, datesSchema } from '../../lib/validators';

describe('Zod Schema Validators', () => {
  describe('partySchema', () => {
    it('rejects invalid email addresses', () => {
      const invalidEmail = {
        name: 'Ahmed',
        email: 'invalid-email-format',
        phone: '1234567890',
        country: 'Egypt',
      };
      const result = partySchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid email');
      }
    });

    it('validates a correct party successfully', () => {
      const valid = {
        name: 'Ahmed',
        email: 'ahmed@test.com',
        phone: '1234567890',
        country: 'Saudi',
      };
      const result = partySchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe('datesSchema', () => {
    it('rejects end dates before start dates', () => {
      const invalidDates = {
        startDate: '2026-06-15',
        endDate: '2026-06-10', // End before Start
      };
      const result = datesSchema.safeParse(invalidDates);
      expect(result.success).toBe(false);
    });

    it('accepts correct date relations', () => {
      const validDates = {
        startDate: '2026-06-10',
        endDate: '2026-06-15',
      };
      const result = datesSchema.safeParse(validDates);
      expect(result.success).toBe(true);
    });
  });

  describe('scopeSchema', () => {
    it('rejects scope without any deliverables', () => {
      const invalidScope = {
        title: 'Project build',
        description: 'Excellent short description detail for this project.',
        deliverables: [], // empty
        revisions: 3,
      };
      const result = scopeSchema.safeParse(invalidScope);
      expect(result.success).toBe(false);
    });
  });
});
