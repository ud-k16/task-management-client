# Welcome to Task Management Application 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started in dev mode

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

```bash
   npm start
```

Features & Screens:

## Authentication:

### Signup Screen:

Users can register with name, email, password.

### Login Screen:

Users can log in using email and password.
Implemented token-based authentication using AsyncStorage to store JWT.[access token and refresh token]

## Task Management:

### Home Screen:

Fetch and display tasks from the backend.
Implemented pull-to-refresh.

### Add Task Screen:

Allow users to create a task (title + description).

### Task Details Screen:

Display task details.
Allow users to edit or delete tasks.

## Logout:

logout button that clears the stored token and navigates to the Login screen.

## Tech Stack & Tools:

#### State Management: React Context API

#### Navigation: React Navigation (Stack Navigator) [Expo Managed File-based routing]

#### Storage: AsyncStorage for storing JWT tokens

#### UI: React Native Paper
