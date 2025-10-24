import {
  TransactionGateway,
  TransactionStatus,
  TransactionType,
} from '@/containers/transactions/domain/enums/transaction';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Ban,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Shield,
  XCircle,
} from 'lucide-react';

const ICON_SIZE = 16;

export const TRANSACTION_TYPE_ICONS: Record<TransactionType, React.ReactNode> =
  {
    [TransactionType.DEPOSIT]: (
      <ArrowUp className="text-green-600" size={ICON_SIZE} />
    ),
    [TransactionType.WITHDRAWAL]: (
      <ArrowDown className="text-red-600" size={ICON_SIZE} />
    ),
    [TransactionType.TRANSFER]: (
      <ArrowRight className="text-blue-600" size={ICON_SIZE} />
    ),
  };

export const TRANSACTION_GATEWAY_ICONS: Record<
  TransactionGateway,
  React.ReactNode
> = {
  [TransactionGateway.PAYPAL]: (
    <CreditCard className="text-blue-600" size={ICON_SIZE} />
  ),
  [TransactionGateway.STRIPE]: (
    <Shield className="text-purple-600" size={ICON_SIZE} />
  ),
  [TransactionGateway.PAYMENT_GATEWAY]: (
    <DollarSign className="text-green-600" size={ICON_SIZE} />
  ),
};

export const TRANSACTION_STATUS_ICONS: Record<
  TransactionStatus,
  React.ReactNode
> = {
  [TransactionStatus.PENDING]: <Clock size={ICON_SIZE} />,
  [TransactionStatus.COMPLETED]: <CheckCircle size={ICON_SIZE} />,
  [TransactionStatus.FAILED]: <XCircle size={ICON_SIZE} />,
  [TransactionStatus.CANCELLED]: <Ban size={ICON_SIZE} />,
};
