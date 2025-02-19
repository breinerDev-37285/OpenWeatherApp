# Weather App

A modern weather application built with Next.js, React, and TypeScript. This application provides real-time weather information with a clean and intuitive user interface.

## Tech Stack

- Next.js 15.1.7
- React 19.0.0
- TypeScript
- TailwindCSS
- Jest & Testing Library
- DayJS
- Yup for validation

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Testing

This project uses Jest and React Testing Library for testing. The test files are located in the `spec/` directory, following a structure that mirrors the source code.

### Running Tests

To run all tests:
```bash
npm test
# or
yarn test
```

To run tests with coverage report:
```bash
npm run test:coverage
# or
yarn test:coverage
```

### Test Structure

Tests are organized in the following directories:

- `spec/app/` - Page component tests
- `spec/components/` - UI component tests
- `spec/hooks/` - Custom hooks tests
- `spec/lib/` - Utility and service tests
- `spec/redux/` - State management tests
- `spec/utils/` - Helper function tests

## Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:
```bash
npm start
# or
yarn start
```