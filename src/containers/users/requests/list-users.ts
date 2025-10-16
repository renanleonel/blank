import { generateRandomUser } from '@/containers/users/domain/mocks';
import { User, UserApiResponse } from '@/containers/users/domain/schemas/user';

const deletedUserIds = new Set<string>();

export const listUsers = async (start: number, size: number): Promise<UserApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users: User[] = [];
  let currentIndex = start;
  let fetchedCount = 0;

  while (fetchedCount < size && currentIndex < 10000) {
    const userId = (currentIndex + 1).toString();

    if (!deletedUserIds.has(userId)) {
      users.push(generateRandomUser(currentIndex + 1));
      fetchedCount++;
    }

    currentIndex++;
  }

  const totalRowCount = 10000 - deletedUserIds.size;
  const hasNextPage = currentIndex < 10000;

  return {
    data: users,
    meta: {
      totalRowCount,
      hasNextPage,
    },
  };
};

export const markUserAsDeleted = (userId: string) => {
  deletedUserIds.add(userId);
};
