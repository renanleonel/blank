import { DeleteUserResponse } from '@/containers/users/domain/schemas/user';

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const success = Math.random() > 0.1;

  if (success) {
    return {
      success: true,
      message: `User with ID ${id} has been successfully deleted.`,
    };
  } else {
    throw new Error(`Failed to delete user with ID ${id}. Please try again.`);
  }
};
