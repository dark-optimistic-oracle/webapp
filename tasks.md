Task: Build the Dark Oprimistic Oracle web app (front end).

Tech used:
- The application shoudl use react and Vite.
- Connect to the Shield wallet (https://aleo.org/shield/) using https://developer.aleo.org/sdk/wallet-adapter/wallet_adapter
- Use dark branding similar to Aleo's own. Use styling and illustrations inspired bu https://0tru.com , which was created by a consultant for me. If you cannot create the horse images, I'll provide an MCP server for image and video creation later.
- Use pnpm package manager.

Product:
- The product Darks Optimistic Oracle is similar to UMA (https://uma.xyz/), but it uses Zero Knowledge cryptography in order to hide the incentive payouts via private token transfers as well as hide the voting on disputes, so the voters cannot be discovered and bribed, and noone can find out how they voted.
- The smart contracts (Aleo programs) are already written and implemented in the folder ../core relative to this folder. 
- The functions are explained in ../core/README.md and the sample workflow at ../core/demo/README.md .

Tests: 
- Test the application with a local devnet deployment as described in ../core/demo/README.md .
- Use the test accounts mentioned in the demo README, and the private keys also mentioned there.
- Create unit tests and use them in the development process.

Documentation: 
- Document your development process in the file DEVELOP
- Dcument the product in README.md
