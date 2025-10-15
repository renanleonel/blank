import { UserAccountType, UserStatus } from '@/lib/constants/user';
import { User } from '@/lib/types/user';

const generateRandomUser = (id: number): User => {
  const teams = ['Engineering', 'Marketing', 'Design', 'Sales', 'Support', 'Product'];

  const organizations = [
    'TechCorp Inc',
    'DataFlow LLC',
    'CloudSync Group',
    'InnovateLab',
    'NextGen Solutions',
    'Digital Dynamics',
    'Future Systems',
    'SmartTech Co',
    'CyberCore',
    'Quantum Labs',
    'Alpha Industries',
    'Beta Ventures',
    'Gamma Technologies',
    'Delta Solutions',
    'Epsilon Corp',
  ];

  const accountTypes: UserAccountType[] = ['company', 'individual'];

  const statuses: UserStatus[] = ['active', 'inactive', 'suspended'];

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'America/Chicago',
    'Europe/Berlin',
    'America/Toronto',
    'Pacific/Auckland',
    'Asia/Dubai',
  ];

  const phoneFormats = [
    () =>
      `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
    () =>
      `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
    () =>
      `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
    () =>
      `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
    () =>
      `+1.${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 900) + 100}.${
        Math.floor(Math.random() * 9000) + 1000
      }`,
  ];

  const randomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2024, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return {
    id: id.toString(),
    team: teams[Math.floor(Math.random() * teams.length)],
    organization: organizations[Math.floor(Math.random() * organizations.length)],
    accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    phone: phoneFormats[Math.floor(Math.random() * phoneFormats.length)](),
    timezone: timezones[Math.floor(Math.random() * timezones.length)],
    createdAt: randomDate(),
    updatedAt: randomDate(),
  };
};

const generateUsers = (count: number): User[] => {
  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    users.push(generateRandomUser(i));
  }

  return users;
};

export const users: User[] = generateUsers(200);
