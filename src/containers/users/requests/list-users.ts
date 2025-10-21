import { generateRandomUser } from '@/containers/users/domain/mocks';
import {
  ListUsersParams,
  User,
  UserApiResponse,
} from '@/containers/users/domain/schemas/user';

const deletedUserIds = new Set<string>();

export const TOTAL_USERS = 200;

export const listUsers = async (
  params: ListUsersParams
): Promise<UserApiResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const users: User[] = [];
  let currentIndex = params.start ?? 0;
  let fetchedCount = 0;

  while (fetchedCount < params.fetchSize && currentIndex < TOTAL_USERS) {
    const userId = (currentIndex + 1).toString();

    if (!deletedUserIds.has(userId)) {
      users.push(generateRandomUser(currentIndex + 1));
      fetchedCount++;
    }

    currentIndex++;
  }

  const filteredUsers = users.filter(user => {
    if (params?.teams && !params?.teams?.includes(user.team)) {
      return false;
    }
    if (
      params?.accountTypes &&
      !params?.accountTypes?.includes(user.accountType)
    ) {
      return false;
    }
    if (params?.status && !params?.status?.includes(user.status)) {
      return false;
    }

    return true;
  });

  const totalRowCount = TOTAL_USERS - deletedUserIds.size;
  const hasNextPage = currentIndex < TOTAL_USERS;

  return {
    data: filteredUsers,
    meta: {
      totalRowCount,
      hasNextPage,
    },
  };
};

export const markUserAsDeleted = (userId: string) => {
  deletedUserIds.add(userId);
};
