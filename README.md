# Task Manager React Native App

Simple task manager app built with Expo Router and React Native.

## Setup and Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start
```

3. Run on a platform:

```bash
npm run ios
npm run android
npm run web
```

Notes:
- You can also press `i`, `a`, or `w` in the Expo CLI after `npm run start`.
- This project uses Expo SDK 54. Use matching Expo Go/dev tooling for best compatibility.

## App Features and Usage

### Features
- Add new tasks from the input field.
- Mark tasks as complete/incomplete.
- Delete tasks.
- Live task progress label in the screen header (`done/total`).
- Empty state message when no tasks exist.
- Animated visual feedback when toggling completion.
- Light/Dark theme toggle via header icon button.

### Special Instructions
- Tasks are stored in component state only (no persistence yet).
- Closing/reloading the app clears all tasks.
- Very long task text is visually constrained in the list for readability.
- Tap the sun/moon icon in the top-right header to switch theme globally.

## Project Structure

```text
app/
   _layout.tsx
   index.tsx
   components/
      TaskEmptyState.tsx
      TaskHeader.tsx
      TaskInput.tsx
      TaskItem.tsx
      ThemeSwitcherIcon.tsx
   theme/
      ThemeContext.tsx
      taskTheme.ts
   types/
      task.ts
```

## Architecture Notes

- `ThemeProvider` is mounted in `app/_layout.tsx` so all routes share the same active theme.
- `ThemeSwitcherIcon` is injected into the stack header (`headerRight`) and toggles Light/Dark mode.
- Screen and UI components receive color tokens from the shared theme object.

## Third-Party Libraries Used

- `expo`: Core runtime and tooling for React Native development.
- `expo-router`: File-based navigation and app entry integration.
- `@expo/vector-icons`: Header theme toggle icon (sun/moon) and icon set support.
- `react`: Component model and state management primitives.
- `react-native`: Cross-platform native UI framework.
- `react-native-reanimated`: Smooth task row completion animations.
- `react-native-safe-area-context`: Correct layout inside safe areas (notches, status bars, home indicator).

## Useful Commands

```bash
npm run lint
npm run reset-project
```
