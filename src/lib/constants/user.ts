const UserAccountType = {
  company: 'company',
  individual: 'individual',
} as const;

const UserStatus = {
  active: 'active',
  inactive: 'inactive',
  suspended: 'suspended',
} as const;

export type UserAccountType = (typeof UserAccountType)[keyof typeof UserAccountType];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
