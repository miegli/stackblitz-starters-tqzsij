import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  filter,
  interval,
  lastValueFrom,
  take,
  takeUntil,
  timeout,
  timer,
} from 'rxjs';

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;

  skipTransition(): void;
}

interface CSSStyleDeclaration {
  viewTransitionName: string;
}

interface Document {
  startViewTransition(
    updateCallback: () => Promise<void> | void
  ): ViewTransition;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({
        canceledNavigationResolution: 'replace',
        onSameUrlNavigation: 'reload',
      }),
      withViewTransitions({
        onViewTransitionCreated: async (transition) => {
          const config = transition.to.firstChild?.data ?? {};
          if (config['viewTransitionWaitForCssSelector']) {
            (document as unknown as Document).startViewTransition(async () => {
              const wait = new Promise(async (resolve) => {
                const waitforAnchor = interval(10).pipe(
                  timeout(1000),
                  filter(() => {
                    return (
                      !config['viewTransitionWaitForCssSelector'] ||
                      document.querySelectorAll(
                        config['viewTransitionWaitForCssSelector']
                      ).length > 0
                    );
                  }),
                  take(1)
                );
                await lastValueFrom(waitforAnchor).catch(() => {
                  resolve(void 0);
                });
                await lastValueFrom(timer(50));
                resolve(void 0);
              });
              await wait;
            });
          }
        },
      })
    ),
  ],
};
