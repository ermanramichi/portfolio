import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HeaderComponent } from './header-component/header-component';
import { MainComponent } from './main-component/main-component';
import { FooterComponent } from './footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 40,
        disable: reduced,
      });
    });
  }
}
