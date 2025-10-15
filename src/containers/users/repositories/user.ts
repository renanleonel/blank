import { UserApiResponse, userApiResponseSchema } from '@/containers/users/domain/schemas/user';
import { listUsers } from '@/containers/users/requests/list-users';

export class UserRepository {
  private constructor() {}

  public static async listUsers(params: {
    start: number;
    fetchSize: number;
  }): Promise<UserApiResponse> {
    const { start, fetchSize } = params;
    const response = await listUsers(start, fetchSize);

    const parsedResponse = userApiResponseSchema.parse(response);

    return parsedResponse;
  }
}
