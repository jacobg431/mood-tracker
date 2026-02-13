# Mood Tracker – Setup & Run Guide

## 1. Prerequisites

Ensure the following are installed:

- **Node.js**: v11.x
- **npm**: v25.x

Verify installed versions:

```bash
node -v
npm -v
```

If the versions do not match, use a version manager such as nvm to install the required versions.

## 2. Clone the Repositories

You must run two projects.

### 2.1 Frontend

```bash
git clone https://github.com/jacobg431/mood-tracker.git
cd mood-tracker
```

### 2.2 Backend API

```bash
git clone https://github.com/jacobg431/frontend-assignment-api.git
cd frontend-assignment-api

```

## 3. Configure Environment Variables

In the root of the mood-tracker project, create a .env file:

```bash
VITE_BASE_URL=https://<url-to-running-instance-of-frontend-assignment-api>
VITE_API_KEY=<64-character-string>
```

Example (local development)

```bash
VITE_BASE_URL=http://localhost:3000
VITE_API_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

Notes:

- VITE_BASE_URL must point to the running API instance.
- VITE_API_KEY must be a valid 64-character key expected by the API.
- Only environment variables prefixed with VITE\_ are exposed to the client by Vite.

## 4. Install Dependencies

From the mood-tracker root directory:

```bash
npm install
```

## 5. Run the Project (Development):

```bash
npm run dev
```

Vite will output a local development URL, typically:

```bash
http://localhost:5173
```

Open this URL in your browser.

## 6. Build for production

```bash
npm run build
```

The optimized production build will be generated in the dist/ directory.
