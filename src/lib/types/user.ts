import { UserAccountType, UserStatus } from '@/lib/constants/user';

export type User = {
  id: string;
  team: string;
  organization: string;
  accountType: UserAccountType;
  status: UserStatus;
  phone: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
};
