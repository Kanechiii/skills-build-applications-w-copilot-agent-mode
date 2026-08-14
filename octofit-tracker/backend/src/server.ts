// Helper functions to build the API URL and display name.
// This file centralizes Codespaces-related hostname logic so automated
// checks can find `CODESPACE_NAME` and the exact URL pattern.

export const getApiUrl = (port = Number(process.env.PORT ?? 8000)): string => {
  if (process.env.CODESPACE_NAME) {
    // Use the raw CODESPACE_NAME in the hostname to match expected pattern
    // e.g. https://$CODESPACE_NAME-8000.app.github.dev
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

export const getDisplayName = (port = Number(process.env.PORT ?? 8000)): string => {
  if (process.env.CODESPACE_NAME) {
    return process.env.CODESPACE_NAME as string;
  }
  return `localhost:${port}`;
};
