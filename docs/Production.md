# Production

To start/build the application in production mode follow the steps below after cloning or updating the repository:

```bash
# Install dependencies
npm install
```

Create a `production.env` file in the `env` directory (or check/update your existing one). Use the `default.env` file as reference, it contains all the supported environment variables (this file is ignored by git due to security reasons).

```bash
# Build the client
npm run build:client

# Start the main server in production mode
npm run start:server:prod
```
