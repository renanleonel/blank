import {
  TransactionCurrency,
  TransactionGateway,
  TransactionStatus,
  TransactionType,
} from '@/containers/transactions/domain/enums/transaction';
import { Transaction } from '@/containers/transactions/domain/schemas/transaction';

const MOCKED_NAMES = [
  'John Doe',
  'Jane Smith',
  'Jim Beam',
  'Jill Johnson',
  'Jackie Chan',
  'Jill Scott',
  'Jill Scott',
];

export const generateRandomTransaction = (id: number): Transaction => {
  const types: TransactionType[] = Object.values(TransactionType);
  const statuses: TransactionStatus[] = Object.values(TransactionStatus);
  const gateways: TransactionGateway[] = Object.values(TransactionGateway);
  const currencies: TransactionCurrency[] = Object.values(TransactionCurrency);

  const froms: string[] = [...MOCKED_NAMES];
  const tos: string[] = [...MOCKED_NAMES];

  const amounts: number[] = [Math.floor(Math.random() * 1000000) + 1];

  const randomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2024, 11, 31);
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    return date.toISOString();
  };

  return {
    id: id.toString(),
    from: froms[Math.floor(Math.random() * froms.length)],
    to: tos[Math.floor(Math.random() * tos.length)],
    type: types[Math.floor(Math.random() * types.length)],
    gateway: gateways[Math.floor(Math.random() * gateways.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: randomDate(),
  };
};
