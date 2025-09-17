import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  form!: FormGroup; // "!" = TS sait qu'on va l'initialiser plus tard
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { username, password } = this.form.value as { username: string; password: string };
    this.auth.register(username, password);

    // auto-login
    const ok = this.auth.login(username, password);
    if (!ok) {
      this.error = 'Auto-login failed. Try again.';
      return;
    }

    this.router.navigateByUrl('/admin');
  }
}
