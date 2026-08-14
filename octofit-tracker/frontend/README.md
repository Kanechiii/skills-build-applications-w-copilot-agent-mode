# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev and build performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Codespaces configuration

Set `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running against the Codespaces backend host.

Example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If the variable is missing, the app falls back to `http://localhost:8000/api` so it does not generate an undefined `https://undefined-8000...` URL.