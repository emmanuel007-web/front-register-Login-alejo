import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // ── Campos ──
  username = '';
  password = '';

  // ── UI ──
  focused  = '';
  showPwd  = false;
  loading  = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  doLogin(): void {
    this.errorMsg = '';

    if (!this.username.trim()) {
      this.errorMsg = 'El nombre de usuario es requerido.';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'La contraseña es requerida.';
      return;
    }

    this.loading = true;

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 401) {
            this.errorMsg = 'Usuario o contraseña incorrectos.';
          } else if (err.status === 0) {
            this.errorMsg = 'No se pudo conectar con el servidor.';
          } else {
            this.errorMsg = 'Ocurrió un error. Intenta de nuevo.';
          }
        }
      });
  }
}