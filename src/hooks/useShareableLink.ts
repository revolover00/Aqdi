'use client';

import { useCallback } from 'react';
import { Contract } from '../types';

export function useShareableLink() {
  const generateLink = useCallback((contract: Contract): string => {
    if (typeof window === 'undefined') return '';
    
    // Remove null/undefined fields
    const cleanJson = JSON.stringify(contract, (_, v) => {
      if (v === null || v === undefined) return undefined;
      return v;
    });

    try {
      // Uri-encode to safely handle Arabic UTF-8 characters under btoa
      const encodedUri = encodeURIComponent(cleanJson);
      const base64 = btoa(encodedUri);
      
      const url = new URL(window.location.origin + '/preview');
      url.searchParams.set('c', base64);
      return url.toString();
    } catch (e) {
      console.error('[useShareableLink] Error generating link:', e);
      return '';
    }
  }, []);

  const parseFromUrl = useCallback((): Contract | null => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const base64 = params.get('c');
      if (!base64) return null;

      const decodedUri = atob(base64);
      const json = decodeURIComponent(decodedUri);
      const parsed = JSON.parse(json) as Contract;
      
      // Basic duck-typing check
      if (parsed && typeof parsed === 'object' && parsed.id && parsed.type) {
        return parsed;
      }
    } catch (e) {
      console.error('[useShareableLink] Error parsing from URL:', e);
    }
    return null;
  }, []);

  const isValidLink = useCallback((urlStr: string): boolean => {
    try {
      const url = new URL(urlStr);
      const base64 = url.searchParams.get('c');
      if (!base64) return false;

      const decoded = atob(base64);
      const json = decodeURIComponent(decoded);
      const parsed = JSON.parse(json);
      return !!(parsed && parsed.id && parsed.type);
    } catch {
      return false;
    }
  }, []);

  return {
    generateLink,
    parseFromUrl,
    isValidLink,
  };
}
