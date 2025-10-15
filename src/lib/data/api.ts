import { generateRandomUser } from '@/lib/data/mocks';
import { User } from '@/lib/types/user';

export interface UserApiResponse {
  data: User[];
  meta: {
    totalRowCount: number;
    hasNextPage: boolean;
  };
}

export const fetchUsers = async (start: number, size: number): Promise<UserApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users: User[] = [];

  for (let i = start; i < start + size; i++) {
    users.push(generateRandomUser(i + 1));
  }

  const totalRowCount = 10000;
  const hasNextPage = start + size < totalRowCount;

  return {
    data: users,
    meta: {
      totalRowCount,
      hasNextPage,
    },
  };
};
