import { Component } from '@angular/core';

interface Fact {
  label: string;
  value: string;
  note: string;
}

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
})
export class AboutComponent {
  readonly facts: Fact[] = [
    { label: 'Education', value: 'Software Engineering', note: 'SS. Cyril and Methodius University — final year' },
    { label: 'Currently', value: 'Web Administrator', note: 'Neptun MK — since November 2024' },
    { label: 'Based in', value: 'Skopje, MK', note: 'Open to side projects, remote or on-site' },
    { label: 'Focus', value: 'Front-end & UI', note: 'Angular, TypeScript, Tailwind, Java' },
  ];
}
