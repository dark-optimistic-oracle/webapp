# Dark Optimistic Oracle - Web App

## Overview
The Dark Optimistic Oracle is a privacy-preserving oracle similar to UMA, utilizing Zero-Knowledge cryptography on the Aleo blockchain. This front-end application provides a seamless interface for users to interact with the underlying smart contracts, ensuring that incentive payouts and dispute voting remain completely hidden and anonymous.

## Features
- **Wallet Integration:** Native connection with Aleo Shield and other Aleo-compatible wallets via standard adapters.
- **Assertions:** Create and submit assertions directly on-chain.
- **Disputes:** Dispute questionable assertions before their deadline.
- **Private Voting:** Purchase voting rights, and cast Confirm or Deny votes entirely in private to eliminate bribery.
- **Reward Collection:** Collect payouts and refunds safely based on dispute outcomes.

## Getting Started

### Prerequisites
- Node.js (v18+)
- `pnpm` package manager
- Aleo Shield Wallet installed in your browser

### Installation
1. Navigate to the `webapp` directory:
   ```bash
   cd webapp
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally
To spin up the development server:
```bash
pnpm run dev
```

### Testing
We use `vitest` for our testing framework. To run unit tests:
```bash
pnpm test
```
