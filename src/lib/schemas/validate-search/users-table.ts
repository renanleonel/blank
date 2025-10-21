import z from 'zod';

export const usersTableSearchSchema = z.object({
  teams: z.array(z.string()).optional(),
  accountTypes: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
});
