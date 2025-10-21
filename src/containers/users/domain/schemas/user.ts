import { UserAccountType } from '@/containers/users/domain/enums/user-account-type';
import { UserStatus } from '@/containers/users/domain/enums/user-status';
import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	team: z.string(),
	organization: z.string(),
	accountType: z.enum(UserAccountType),
	status: z.enum(UserStatus),
	phone: z.string(),
	timezone: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const listUsersParamsSchema = z.object({
	fetchSize: z.number().optional(),
});

export type ListUsersParams = z.infer<typeof listUsersParamsSchema>;

export const userApiResponseSchema = z.object({
	data: z.array(userSchema),
	meta: z.object({
		totalRowCount: z.number(),
		hasNextPage: z.boolean(),
	}),
});

export type UserApiResponse = z.infer<typeof userApiResponseSchema>;

export const listUsersQueryResultSchema = z.object({
	list: z.array(userSchema),
	pagination: z.object({
		totalRowCount: z.number(),
		hasNextPage: z.boolean(),
		totalFetched: z.number(),
	}),
});

export type ListUsersQueryResult = z.infer<typeof listUsersQueryResultSchema>;

export const deleteUserResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
});

export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
