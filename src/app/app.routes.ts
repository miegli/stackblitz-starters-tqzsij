import {Routes} from '@angular/router';
import {TestAComponent} from './containers/test-a/test-a.component';
import {TestBComponent} from './containers/test-b/test-b.component';
import {viewTransitionConfigData} from './viewTransitionConfigData';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'a',
        pathMatch: 'full'
    },
    {
        path: 'a',
        component: TestAComponent,
    },
    {
        path: 'b',
        component: TestBComponent,
        data: {
            ...viewTransitionConfigData({ cssSelector: 'img' }),
        },
    },
];
