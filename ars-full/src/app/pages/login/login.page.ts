// src/app/pages/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonButton, IonCheckbox, IonSpinner,
  IonIcon, IonInput, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, alertCircle } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    IonContent, IonButton, IonCheckbox, IonSpinner, IonIcon, IonInput, IonItem, IonLabel
  ]
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  showPassword = false;
  isLoading    = false;
  errorMessage = '';

  constructor(
    private fb:     FormBuilder,
    private auth:   AuthService,
    private router: Router
  ) {
    addIcons({ personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, alertCircle });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dealerId:   ['', [Validators.required]],
      password:   ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get dealerId()  { return this.form.get('dealerId')!;  }
  get password()  { return this.form.get('password')!;  }

  togglePassword(): void { this.showPassword = !this.showPassword; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading    = true;
    this.errorMessage = '';

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading    = false;
        this.errorMessage = err?.message || 'Incorrect Username or Password.';
      }
    });
  }
}
