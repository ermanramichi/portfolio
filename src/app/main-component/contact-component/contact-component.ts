import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

interface Social {
  label: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {
  readonly socials: Social[] = [
    {
      label: 'GitHub',
      handle: '@ermanramichi',
      url: 'https://github.com/ermanramichi',
      icon: 'fa-brands fa-github',
      color: '#e9eefb',
    },
    {
      label: 'LinkedIn',
      handle: 'in/ermanramichi',
      url: 'https://mk.linkedin.com/in/ermanramichi',
      icon: 'fa-brands fa-linkedin-in',
      color: '#4aa3ff',
    },
    {
      label: 'Instagram',
      handle: '@ermanramiqi',
      url: 'https://www.instagram.com/ermanramiqi',
      icon: 'fa-brands fa-instagram',
      color: '#ff6ba9',
    },
    {
      label: 'Facebook',
      handle: '@ermanzz',
      url: 'https://www.facebook.com/ermanzz',
      icon: 'fa-brands fa-facebook-f',
      color: '#5b8cff',
    },
  ];

  /* ── Formspree contact form ──────────────────────────────────────
     Kept intact and ready to use. The template currently renders the
     social links only — to bring the form back, add the markup bound
     to `contactForm` and `onSubmit()`, and re-add ReactiveFormsModule
     to this component's `imports`.
  ──────────────────────────────────────────────────────────────────*/
  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  submitError = false;

  private formspreeUrl = 'https://formspree.io/f/xanbdlar';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.mk')) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitted = false;
      this.submitError = false;

      const formData = {
        email: this.contactForm.get('email')?.value,
        subject: this.contactForm.get('subject')?.value,
        message: this.contactForm.get('message')?.value,
        _replyto: this.contactForm.get('email')?.value,
      };

      this.http
        .post(this.formspreeUrl, formData, { headers: { Accept: 'application/json' } })
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.submitted = true;
            this.contactForm.reset();
          },
          error: (error) => {
            this.isSubmitting = false;
            this.submitError = true;
            console.error('Form submission error:', error);
          },
        });
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
