// src/app/pages/forgot-password/forgot-password.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, arrowBackOutline, mailOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonIcon, IonSpinner]
})
export class ForgotPasswordPage implements OnInit {
  form!: FormGroup;
  isLoading   = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    addIcons({ personOutline, arrowBackOutline, mailOutline, checkmarkCircleOutline });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dealerId: ['', Validators.required]
    });
  }

  get dealerId() { return this.form.get('dealerId')!; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading = true;
    // Replace with real API call via auth.forgotPassword()
    setTimeout(() => {
      this.isLoading   = false;
      this.isSubmitted = true;
    }, 1500);
  }
}
