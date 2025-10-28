import { z } from 'zod';

export const savedLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  timestamp: z.instanceof(Date),
  position: z.tuple([z.number(), z.number()]),
});

export type SavedLocation = z.infer<typeof savedLocationSchema>;

export const DEFAULT_LOCATION: [number, number] = [-23.555768, -46.639551];
