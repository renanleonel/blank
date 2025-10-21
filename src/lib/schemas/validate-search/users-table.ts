import { Team } from "@/containers/users/domain/enums/team";
import { UserAccountType } from "@/containers/users/domain/enums/user-account-type";
import { UserStatus } from "@/containers/users/domain/enums/user-status";
import z from "zod";

export const usersTableSearchSchema = z.object({
  teams: z.array(z.enum(Team)).optional(),
  accountTypes: z.array(z.enum(UserAccountType)).optional(),
  status: z.array(z.enum(UserStatus)).optional(),
});
