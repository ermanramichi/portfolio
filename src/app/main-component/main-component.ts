import { Component } from '@angular/core';
import { HeroComponent } from "./hero-component/hero-component";

import { ContactComponent } from "./contact-component/contact-component";
import { ExperienceTabComponent } from '../experience-tab-component/experience-tab-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-component',
  imports: [HeroComponent,ExperienceTabComponent, ContactComponent, RouterOutlet],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {

}
