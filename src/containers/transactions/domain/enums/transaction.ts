export enum TransactionType {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdrawal',
  TRANSFER = 'Transfer',
}

export enum TransactionGateway {
  PAYPAL = 'Paypal',
  STRIPE = 'Stripe',
  PAYMENT_GATEWAY = 'Payment Gateway',
}

export enum TransactionStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  CANCELLED = 'Cancelled',
}

export enum TransactionCurrency {
  USD = 'USD',
  EUR = 'EUR',
  BRL = 'BRL',
  BTC = 'BTC',
  ETH = 'ETH',
}
