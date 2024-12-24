# Moshi Chat Application

A modern chat application built with React, TypeScript, and Vite that allows users to interact with LLM chat bot for purchasing 
products in an Instagram-inspired environment.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/1eea053f-9259-4b8c-9be2-1f9c6013fd01" />

## Live Demo
A live demo can be found here: [Moshi Chat](https://moshi-chat.netlify.app/)
## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:cejohnson230/moshi-chat.git
cd moshi-chat
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Backend Server
The backend server/APIs can be found here: [moshi-server](https://github.com/cejohnson230/moshi-server)

Follow the instructions found in the README to run the backend APIs. This service's URL is defined in the .env file.


## Create .env File

Create a .env file at the root of the project and populate the following variable with the correct URl for the backend server
```
VITE_API_BASE_URL=http://localhost:3000 
```


## Project Architecture

Detailed documentation about the application's architecture can be found in the `/docs/architecture` directory.

For more information, see [Architecture Documentation](/docs/architecture/README.md).

## Common Issues and Solutions

### Build Errors

**Issue**: TypeScript compilation errors
**Solution**: Ensure all dependencies are installed and TypeScript configurations are correct:
```bash
npm install
npm run type-check
```

**Issue**: Vite HMR not working
**Solution**: Clear your browser cache and restart the development server

### Development Setup

If ESLint shows errors, ensure you have the correct configuration:

1. Install required ESLint dependencies:
```bash
npm install -D eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. Check that your `tsconfig.json` includes all necessary files:
```json
{
  "include": ["src"],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
