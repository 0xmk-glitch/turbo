import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { routes } from './app.routes';
import { authReducer } from './stores/auth/auth.reducer';
import { AuthEffects } from './stores/auth/auth.effects';
import { tasksReducer } from './stores/tasks/tasks.reducer';
import { TasksEffects } from './stores/tasks/tasks.effects';
import { organizationsReducer } from './stores/organizations/organizations.reducer';
import { OrganizationsEffects } from './stores/organizations/organizations.effects';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      tasks: tasksReducer,
      organizations: organizationsReducer,
    }),
    provideEffects([AuthEffects, TasksEffects, OrganizationsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    importProvidersFrom(MatNativeDateModule),
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    AuthService,
  ],
};
