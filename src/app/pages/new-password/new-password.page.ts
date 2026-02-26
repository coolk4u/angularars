// src/app/pages/new-password/new-password.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, eyeOutline, eyeOffOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

function passwordMatchValidator(g: AbstractControl) {
  const p1 = g.get('newPassword')?.value;
  const p2 = g.get('confirmPassword')?.value;
  return p1 === p2 ? null : { mismatch: true };
}

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonIcon, IonSpinner]
})
export class NewPasswordPage implements OnInit {
  form!: FormGroup;
  showNew     = false;
  showConfirm = false;
  isLoading   = false;
  isSuccess   = false;
  resetToken  = '';

  constructor(
    private fb:     FormBuilder,
    private auth:   AuthService,
    private router: Router,
    private route:  ActivatedRoute
  ) {
    addIcons({ lockClosedOutline, eyeOutline, eyeOffOutline, checkmarkCircleOutline });
  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.queryParams['token'] || '';
    this.form = this.fb.group({
      newPassword:     ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  get newPassword()     { return this.form.get('newPassword')!;     }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get hasMismatch()     { return this.form.hasError('mismatch') && this.confirmPassword.touched; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading = true;
    // Replace with: this.auth.resetPassword(this.resetToken, this.form.value.newPassword)
    setTimeout(() => {
      this.isLoading = false;
      this.isSuccess = true;
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, 1500);
  }
}
