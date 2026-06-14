'use client';

import { useEffect, useState } from 'react';
import { Contract } from '../types';

export function useDeadlineNotifier(contracts: Contract[]) {
  const [approachingContracts, setApproachingContracts] = useState<Contract[]>([]);

  const fireNotifications = (upcoming: Contract[]) => {
    upcoming.forEach((c) => {
      new Notification('عقدي | Aqdi Deadline Alert', {
        body: `The deadline for contract "${c.scope.title}" is in less than 3 days!`,
        icon: '/favicon.ico',
      });
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return;

    // Check once per session
    const alreadyChecked = sessionStorage.getItem('aqdi_deadline_checked');
    if (alreadyChecked) return;

    const findUpcomingDeadlines = () => {
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      const now = new Date();
      const upcoming: Contract[] = [];

      contracts.forEach((contract) => {
        if (contract.status === 'active' && contract.dates.endDate) {
          const endDate = new Date(contract.dates.endDate);
          const diff = endDate.getTime() - now.getTime();
          
          // Deadlines within 3 days (and not already past)
          if (diff > 0 && diff <= threeDaysInMs) {
            upcoming.push(contract);
          }
        }
      });

      return upcoming;
    };

    const upcoming = findUpcomingDeadlines();
    if (upcoming.length === 0) {
      sessionStorage.setItem('aqdi_deadline_checked', 'true');
      return;
    }

    setTimeout(() => {
      setApproachingContracts(upcoming);
      // Attempt browser Notification
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          fireNotifications(upcoming);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              fireNotifications(upcoming);
            }
          });
        }
      }
    }, 0);
    
    sessionStorage.setItem('aqdi_deadline_checked', 'true');
  }, [contracts]);

  return { approachingContracts };
}
