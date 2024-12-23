# AI Chat Application

A modern chat application built with React, TypeScript, and Vite that allows users to interact with AI models.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
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

## Build for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Running Ollama Locally

1. Install Ollama from [ollama.ai](https://ollama.ai)

2. Pull the required model:
```bash
ollama pull llama2
```

3. Start the Ollama server:
```bash
ollama serve
```

4. The API will be available at `http://localhost:11434`

### Supported Models

- Llama2

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
