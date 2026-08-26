import { Routes } from '@angular/router';
import { MainComponent } from './main-component/main-component';

/**
 * The portfolio is a single page — navigation is anchor-based scrolling
 * handled by the header, so one route is all that's needed.
 */
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '**', redirectTo: '' },
];
