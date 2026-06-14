import { z } from 'zod';

export const partySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Invalid phone number'),
  country: z.string().min(2, 'Country is required'),
});

export const scopeSchema = z.object({
  title: z.string().min(5, 'Project title too short'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  deliverables: z.array(z.string().min(3)).min(1, 'Add at least one deliverable'),
  revisions: z.number().min(0).max(10),
});

export const pricingSchema = z.object({
  amount: z.number({ invalid_type_error: 'Amount must be a number' }).positive('Amount must be positive'),
  currency: z.enum(['USD', 'EGP', 'SAR', 'AED']),
  paymentTerms: z.enum(['full-upfront', '50-50', '30-70', 'milestone-based', 'upon-delivery']),
  latePenaltyPercent: z.number().min(0).max(10),
});

export const datesSchema = z.object({
  startDate: z.string().min(1, 'Start date required'),
  endDate: z.string().min(1, 'End date required'),
}).refine(
  (data) => {
    if (!data.startDate || !data.endDate) return true;
    return new Date(data.endDate) > new Date(data.startDate);
  },
  { message: 'End date must be after start date', path: ['endDate'] }
);
