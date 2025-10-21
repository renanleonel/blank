import { LIST_USERS_QUERY_KEY } from '@/containers/users/queries/user-queries';
import { UserRepository } from '@/containers/users/repositories/user';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type DeleteUserProps = {
	options?: Omit<
		UseMutationOptions<
			{ success: boolean; message: string },
			AxiosError,
			string
		>,
		'mutationFn'
	>;
};

function useDeleteUser({ options }: DeleteUserProps = {}) {
	const queryClient = useQueryClient();

	const mutation = useMutation<
		{ success: boolean; message: string },
		AxiosError,
		string
	>({
		mutationFn: async (id: string) => {
			const response = await UserRepository.deleteUser(id);

			return response;
		},
		...options,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: [LIST_USERS_QUERY_KEY] });

			options?.onSuccess?.(...args);
		},
		onError: error => {
			console.error('Failed to delete user:', error.message);
		},
	});

	return mutation;
}

export { useDeleteUser };
