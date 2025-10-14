export interface User {
  id: string;
  team: string;
  organization: string;
  accountType: 'company' | 'individual';
  status: 'suspended' | 'active' | 'inactive';
  phone: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export const users: User[] = [
  {
    id: '1',
    team: 'Engineering',
    organization: 'Skiles-Osinski',
    accountType: 'company',
    status: 'suspended',
    phone: '507-296-7199',
    timezone: 'America/Moncton',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '2',
    team: 'Marketing',
    organization: 'Ernser-Streich',
    accountType: 'individual',
    status: 'active',
    phone: '820.968.5268',
    timezone: 'Europe/Malta',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '3',
    team: 'Design',
    organization: 'Kshlerin LLC',
    accountType: 'company',
    status: 'inactive',
    phone: '1-334-566-5763',
    timezone: 'Atlantic/South_Georgia',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '4',
    team: 'Engineering',
    organization: 'Considine LLC',
    accountType: 'individual',
    status: 'active',
    phone: '+1 (248) 315-0295',
    timezone: 'Atlantic/Stanley',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '5',
    team: 'Marketing',
    organization: 'Romaguera, Pacocha and Konopelski',
    accountType: 'company',
    status: 'suspended',
    phone: '502.384.6216',
    timezone: 'America/Thule',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '6',
    team: 'Design',
    organization: 'Witting Group',
    accountType: 'individual',
    status: 'active',
    phone: '+1-312-939-2551',
    timezone: 'Pacific/Saipan',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '7',
    team: 'Engineering',
    organization: 'Cremin, Ebert and Wilderman',
    accountType: 'company',
    status: 'inactive',
    phone: '(580) 233-2008',
    timezone: 'UTC',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '8',
    team: 'Marketing',
    organization: 'Hintz Group',
    accountType: 'individual',
    status: 'active',
    phone: '+1-854-923-6526',
    timezone: 'Europe/Lisbon',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '9',
    team: 'Design',
    organization: 'Kuvalis-White',
    accountType: 'company',
    status: 'suspended',
    phone: '+1.225.384.5758',
    timezone: 'Pacific/Efate',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
  {
    id: '10',
    team: 'Engineering',
    organization: 'Schuster-Block',
    accountType: 'individual',
    status: 'active',
    phone: '+1.435.366.1642',
    timezone: 'America/Argentina/San_Luis',
    createdAt: '20 Jul 2020',
    updatedAt: '20 Jul 2020',
  },
];
