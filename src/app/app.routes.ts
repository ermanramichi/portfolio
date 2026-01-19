import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AboutComponent } from './main-component/about-component/about-component';
import { ContactComponent } from './main-component/contact-component/contact-component';
import { MainComponent } from './main-component/main-component';
import { ExperienceComponent } from './main-component/experience-component/experience-component';
import { HeroComponent } from './main-component/hero-component/hero-component';
import { HeaderComponent } from './header-component/header-component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: HeroComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'technologies',component: ExperienceComponent },

];

const config: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 84], // optional: adjust if you have a fixed navbar
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
