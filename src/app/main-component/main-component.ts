import { Component } from '@angular/core';
import { HeroComponent } from './hero-component/hero-component';
import { AboutComponent } from './about-component/about-component';
import { ExperienceTabComponent } from '../experience-tab-component/experience-tab-component';
import { ContactComponent } from './contact-component/contact-component';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ExperienceTabComponent, ContactComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {}
