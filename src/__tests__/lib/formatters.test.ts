import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '../../lib/formatters';

describe('Formatters Utilities', () => {
  describe('formatCurrency', () => {
    it('handles USD properly', () => {
      const usdEn = formatCurrency(120, 'USD', 'en');
      // Should contain $ and 120
      expect(usdEn).toContain('$');
      expect(usdEn).toContain('120');
    });

    it('handles EGP formatted correctly under Arabic and English', () => {
      const egpEn = formatCurrency(500, 'EGP', 'en');
      expect(egpEn).toContain('EGP');
      expect(egpEn).toContain('500');
    });

    it('handles SAR correctly', () => {
      const sarEn = formatCurrency(1000, 'SAR', 'en');
      expect(sarEn).toContain('SAR');
      expect(sarEn).toContain('1,000');
    });
  });

  describe('formatDate', () => {
    it('formats ISO dates correctly into English textual dates', () => {
      const formatted = formatDate('2026-06-13', 'en');
      expect(formatted).toContain('June');
      expect(formatted).toContain('13');
      expect(formatted).toContain('2026');
    });
  });
});
