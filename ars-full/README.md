# ARS Green Steel — Ionic 7 + Angular App

## Stack
- **Ionic**: 7.2.1
- **Angular**: 17+ (Standalone Components)
- **Mode**: Material Design (`md`) for consistent cross-platform look

## Project Structure
```
src/
  app/
    pages/
      login/                  ← Login page (3 states: empty, filled, error)
      forgot-password/        ← Forgot password + send email
      new-password/           ← Create new password + confirm
      dashboard/              ← Main dashboard with sidebar, stats, charts, tables
    services/
      auth.service.ts         ← Login, logout, forgot/reset password
    guards/
      auth.guard.ts           ← authGuard (protected), publicGuard (login/etc)
    models/
      auth.model.ts           ← LoginRequest, AuthResponse, User interfaces
  theme/
    variables.scss            ← ARS brand colors + Ionic overrides
  main.ts                     ← Bootstrap (standalone)
  assets/
    ars-logo.png              ← Add the ARS Green Steel logo here
```

## Quick Start

```bash
# 1. Create Ionic project
npm install -g @ionic/cli
ionic start ars-dealer-portal blank --type=angular --capacitor

# 2. Install dependencies
npm install

# 3. Copy all generated files into src/

# 4. Add the ARS logo
# Place ars-logo.png in src/assets/

# 5. Serve
ionic serve

# 6. Build for Android
npx cap add android
ionic build
npx cap sync
npx cap open android

# 7. Build for iOS
npx cap add ios
ionic build
npx cap sync
npx cap open ios
```

## API Integration
Replace mock in `auth.service.ts`:
```typescript
// Current (mock):
return of(mockResp).pipe(...)

// Replace with:
return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, req).pipe(...)
```

## Screens Implemented
| Screen | File | States |
|--------|------|--------|
| Login | `login/` | Empty, Filled, Error |
| Forgot Password | `forgot-password/` | Form, Success |
| Create New Password | `new-password/` | Form, Success |
| Dashboard | `dashboard/` | Full with sidebar, stats, charts, tables |

## Notes
- All components are **standalone** (Angular 17+)
- Uses Ionic 7 standalone imports — no `IonicModule` needed
- `@if` / `@for` control flow (Angular 17 syntax)
- Auth state managed via Angular `signal()`
- Sidebar uses `IonSplitPane` — auto-shows on tablet/desktop, hamburger on mobile
