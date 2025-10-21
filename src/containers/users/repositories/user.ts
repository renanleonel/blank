import {
  DeleteUserResponse,
  deleteUserResponseSchema,
  ListUsersParams,
  UserApiResponse,
  userApiResponseSchema,
} from '@/containers/users/domain/schemas/user';
import { deleteUser } from '@/containers/users/requests/delete-user';
import { listUsers } from '@/containers/users/requests/list-users';

export class UserRepository {
  public static async listUsers(
    params: ListUsersParams
  ): Promise<UserApiResponse> {
    console.log('params', params);
    const response = await listUsers(params);

    const parsedResponse = userApiResponseSchema.parse(response);

    return parsedResponse;
  }

  public static async deleteUser(id: string): Promise<DeleteUserResponse> {
    const response = await deleteUser(id);

    const parsedResponse = deleteUserResponseSchema.parse(response);

    return parsedResponse;
  }
}
