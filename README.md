
API ENDPOINTS:-

| API                       | Description      |
| ------------------------- | ---------------- |
| `POST /api/auth/login`    | Login            |
| `POST /api/auth/register` | Register         |
| `GET /api/problems`       | List problems    |
| `GET /api/problems/:slug` | Problem details  |
| `POST /api/progress`      | Mark solved      |
| `GET /api/profile`        | User stats       |
| `POST /api/bookmarks`     | Save problem     |
| `POST /api/admin/problem` | Add/Edit problem |


FRONTEND ARCHITECTURE:-

| Route              | Purpose         |
| ------------------ | --------------- |
| `/`                | Landing page    |
| `/login`           | Auth            |
| `/problems`        | Problem list    |
| `/problems/[slug]` | Problem details |
| `/profile`         | User stats      |
| `/bookmarks`       | Saved problems  |
| `/admin`           | Admin dashboard |


