# Development

To start development, follow the steps below after cloning or updating the repository:

```bash
# Install dependencies
npm install
```

Create a `local.env` file in the `env` directory (or check/update your existing one). Use the `default.env` file as reference, it contains all the supported environment variables (this file is ignored by git due to security reasons).

```bash
# Start the client development server
npm run start:client

# Start the main server in development mode
npm run start:server
```
