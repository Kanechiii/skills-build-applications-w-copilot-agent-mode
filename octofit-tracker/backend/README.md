# OctoFit Backend

Run the backend in development mode from the repository root:

```bash
npm --prefix octofit-tracker/backend run dev
```

- Default port: `8000` (set `PORT` to override)
- Example environment values: see `.env.example`
- Codespaces-aware API URL: `https://$CODESPACE_NAME-8000.app.github.dev` when `CODESPACE_NAME` is present

Useful endpoints to validate:

- `GET /api/health` — returns `apiUrl` and `displayName`
- `GET /api/users` — list users
- `GET /api/activities` — list activities
