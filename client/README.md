# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


src/
└── app/
    ├── auth/                    
    │   ├── login/               # login.component.ts (standalone)
    │   ├── register/            # register.component.ts (standalone)
    │   └── auth.routes.ts       # Routes for auth (if using lazy loading)
    │
    ├── core/                    # Singleton services, guards, models
    │   ├── services/
    │   │   ├── auth.service.ts
    │   │   ├── user.service.ts
    │   │   └── api.service.ts
    │   ├── guards/
    │   │   └── auth.guard.ts
    │   └── models/
    │       └── user.model.ts
    │
    ├── shared/                  # Shared UI components (standalone)
    │   ├── header/              # header.component.ts
    │   ├── sidebar/             # sidebar.component.ts
    │   ├── button/              # shared button or input components
    │   └── shared.module.ts     # optional, only if needed to group standalone logic
    │
    ├── forms/                   # Reusable forms (as components)
    │   ├── task-form/
    │   │   └── task-form.component.ts
    │   ├── user-form/
    │   │   └── user-form.component.ts
    │
    ├── dashboard/               # Protected section after login
    │   ├── overview/
    │   │   └── overview.component.ts
    │   └── dashboard.routes.ts
    │
    ├── app.component.ts         # Root standalone component
    ├── app.routes.ts            # Root routing config
    └── main.ts                  # Bootstrap logic
