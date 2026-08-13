export type WalletTransactionStatus = {
  status: string;
  transactionId?: string;
  error?: string;
};

export type SettledWalletTransaction = WalletTransactionStatus & {
  attempts: number;
  timedOut: boolean;
};

type TransactionStatusLookup = (walletRequestId: string) => Promise<WalletTransactionStatus>;

const TERMINAL_STATUSES = new Set(['accepted', 'failed', 'rejected']);

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export async function waitForWalletTransaction(
  transactionStatus: TransactionStatusLookup,
  walletRequestId: string,
  maxAttempts = 60,
  pollIntervalMs = 2_000,
): Promise<SettledWalletTransaction> {
  let latest: WalletTransactionStatus = { status: 'pending' };

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      latest = await transactionStatus(walletRequestId);
      if (TERMINAL_STATUSES.has(latest.status.toLowerCase())) {
        return { ...latest, attempts: attempt, timedOut: false };
      }
    } catch (error) {
      latest = {
        status: 'pending',
        error: error instanceof Error ? error.message : String(error),
      };
    }

    if (attempt < maxAttempts) await delay(pollIntervalMs);
  }

  return { ...latest, attempts: maxAttempts, timedOut: true };
}
