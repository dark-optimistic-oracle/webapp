# Task: Build the Dark Oprimistic Oracle web app (front end).

I'll split the tasks into two parts (chapters titled starting with "##"):
- Already completed
- Next steps

As the progress moves, I'll move completed work to "Already completed" and add new tasks to "Next steps".

## Already completed

### Tech used:
- The application should use react and Vite.
- Connect to the Shield wallet (https://aleo.org/shield/) using https://developer.aleo.org/sdk/wallet-adapter/wallet_adapter
- Use dark branding similar to Aleo's own. Use styling and illustrations inspired bu https://0tru.com , which was created by a consultant for me. If you cannot create the horse images, I'll provide an MCP server for image and video creation later.
- Use pnpm package manager.

### Product:
- The product Darks Optimistic Oracle is similar to UMA (https://uma.xyz/), but it uses Zero Knowledge cryptography in order to hide the incentive payouts via private token transfers as well as hide the voting on disputes, so the voters cannot be discovered and bribed, and no one can find out how they voted.
- The smart contracts (Aleo programs) are already written and implemented in the folder ../core relative to this folder. 
- The functions are explained in ../core/README.md and the sample workflow at ../core/demo/README.md .

### Tests: 
- Test the application with a local devnet deployment as described in ../core/demo/README.md .
- Use the test accounts mentioned in the demo README, and the private keys also mentioned there.
- Create unit tests and use them in the development process.

### Documentation: 
- Document your development process in the file DEVELOP
- Document the product in README.md

## Next steps

- Create a Git Tag in the repo locally and push it remotely named "v0.0.1 - Crude buttons and calls".

- Create a new branch named "real-ui" to work on the UI, and push it to the remote.

### Real-ui

- Create the UI that mimics the UMA protocol UI. It should have similar workflow.
- Note that the UMA dispute process is on Ethereum mainnet, while this on is on Aleo. For now there is no cross-chain communication or claims.
- Look at the latest UMA documentation and UI for reference and inspiration.
- Create unit tests for the UI components and use them in the development process. Make sure they pass.
- Test the entire UI.
- For the work, use the contracts in ../core and the demo deployment in ../core/demo as the backend. Use the test accounts and private keys mentioned in the demo README for testing. Also note that ../token-registry-workaround is used because at that time Aleo could not compile it's own token registry because the names wer e too long. So the workaround is used to deploy a token registry with shorter names, and the UI should use that one for testing. The token registry is not used in the final product, but it is used for testing and development.
- Document the development process in DEVELOP and the product in README.md, by adding to the existing DEVELOP and updating the existing README.md to reflect the new UI and the changes in the product. Make sure to explain how to use the UI and how it works, as well as the development process and any challenges faced. Also explain how to run the tests and what they cover.
