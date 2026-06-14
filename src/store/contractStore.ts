import { Contract } from '../types';

let currentContract: Contract | null = null;
const listeners = new Set<() => void>();

export const contractStore = {
  getContract(): Contract | null {
    if (typeof window === 'undefined') return null;
    return currentContract;
  },
  
  setContract(contract: Contract | null): void {
    currentContract = contract;
    listeners.forEach((listener) => listener());
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
