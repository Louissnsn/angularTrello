//classe injectable qui permet de partager de la logique entre plusieurs parties de l'app
//ex : stocker ou gérer l'état d'authentification de l'utilisateur (token, rôle, login/logout, etc)
//dans mon projet on est en mock sans backend pour l'instant : c'est une très mauvaise pratique de stocker les infos côté client
//en situation "réelle" on aurait une communication entre l'authservice et le backend
// auth.service.ts
import { Injectable } from '@angular/core';

type StoredUser = { username: string; password: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private LS_KEY = 'app_user';

  register(username: string, password: string): void {
    const user: StoredUser = { username, password };
    localStorage.setItem(this.LS_KEY, JSON.stringify(user));
  }

  login(username: string, password: string): boolean {
    const raw = localStorage.getItem(this.LS_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw) as StoredUser;
    const ok = saved.username === username && saved.password === password;
    if (ok) sessionStorage.setItem('logged_in', 'true');
    return ok;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('logged_in') === 'true';
  }

  logout(): void {
    sessionStorage.removeItem('logged_in');
  }
}
