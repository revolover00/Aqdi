'use client';

import { useState, useEffect, useCallback } from 'react';
import { Contract, ContractStatus } from '../types';

export function useContractStorage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Load contracts from localStorage safely on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('aqdi_contracts');
      if (stored) {
        const parsed = JSON.parse(stored) as Contract[];
        if (Array.isArray(parsed)) {
          // Sort by createdAt desc
          const sorted = parsed.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setContracts(sorted);
          return;
        }
      }
    } catch (e) {
      console.error('[useContractStorage] Failed to parse contracts', e);
    }
    setContracts([]);
  }, []);

  const saveContractsState = useCallback((newContracts: Contract[]) => {
    // Sort and limit to 50
    const sorted = [...newContracts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const limited = sorted.slice(0, 50);
    setContracts(limited);

    try {
      localStorage.setItem('aqdi_contracts', JSON.stringify(limited));
    } catch (e) {
      console.error('[useContractStorage] Failed to save to localStorage', e);
    }
  }, []);

  const saveContract = useCallback((contract: Contract) => {
    setContracts((current) => {
      const exists = current.findIndex((c) => c.id === contract.id);
      let updated: Contract[];
      if (exists !== -1) {
        updated = [...current];
        updated[exists] = { ...contract, updatedAt: new Date().toISOString() };
      } else {
        updated = [contract, ...current];
      }
      setTimeout(() => saveContractsState(updated), 0);
      return updated;
    });
  }, [saveContractsState]);

  const deleteContract = useCallback((id: string) => {
    setContracts((current) => {
      const updated = current.filter((c) => c.id !== id);
      setTimeout(() => saveContractsState(updated), 0);
      return updated;
    });
  }, [saveContractsState]);

  const getContract = useCallback((id: string): Contract | undefined => {
    return contracts.find((c) => c.id === id);
  }, [contracts]);

  const updateStatus = useCallback((id: string, status: ContractStatus) => {
    setContracts((current) => {
      const updated = current.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status,
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      });
      setTimeout(() => saveContractsState(updated), 0);
      return updated;
    });
  }, [saveContractsState]);

  return {
    contracts,
    saveContract,
    deleteContract,
    getContract,
    updateStatus,
  };
}
