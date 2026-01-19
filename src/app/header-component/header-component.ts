import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  isScrolled=false;
  @HostListener('window:scroll')
  onWindowScroll(): void{
    this.isScrolled = window.pageYOffset > 50;
  }
  get getClasses(): string {
    const baseClasses = 'w-full h-16 flex justify-center items-center sticky top-0 z-9999 md:h-24';
    const scrolledClasses = 'backdrop-blur bg-black/30';
    const transparentClasses = 'bg-transparent text-white';

    return `${baseClasses} ${this.isScrolled ? scrolledClasses : transparentClasses}`;
  }
}
