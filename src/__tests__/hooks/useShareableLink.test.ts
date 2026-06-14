import { describe, it, expect } from 'vitest';
import { Contract } from '../../types';

describe('useShareableLink Utility Logic', () => {
  const mockContract: Partial<Contract> = {
    id: 'contract-id-123',
    type: 'web-development',
    language: 'ar',
    status: 'draft',
    freelancer: { name: 'Dev', email: 'dev@test.com', phone: '12345678', country: 'Egypt' },
    client: { name: 'Client', email: 'cli@test.com', phone: '87654321', country: 'KSA' },
  };

  it('performs clean base64 round-trip encoding and decoding', () => {
    // Stringify and cleannulls
    const jsonStr = JSON.stringify(mockContract);
    
    // safe btoa / atob simulation handling UTF-8 safely
    const base64 = btoa(encodeURIComponent(jsonStr));
    expect(base64).toBeDefined();

    const decodedUri = atob(base64);
    const decodedJson = decodeURIComponent(decodedUri);
    const parsed = JSON.parse(decodedJson) as Contract;

    expect(parsed.id).toBe(mockContract.id);
    expect(parsed.freelancer.name).toBe(mockContract.freelancer?.name);
    expect(parsed.client.country).toBe(mockContract.client?.country);
  });

  it('handles invalid base64 parse gracefully', () => {
    const parseInvalid = () => {
      const invalidBase64 = '!!!invalid_base_64_state!!!';
      const decoded = atob(invalidBase64);
      return JSON.parse(decoded);
    };
    expect(parseInvalid).toThrow();
  });
});
