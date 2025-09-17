//classe injectable qui permet de partager de la logique entre plusieurs parties de l'app
//ex : stocker ou gérer l'état d'authentification de l'utilisateur (token, rôle, login/logout, etc)
//dans mon projet on est en mock sans backend pour l'instant : c'est une très mauvaise pratique de stocker les infos côté client
//en situation "réelle" on aurait une communication entre l'authservice et le backend
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = false;

  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = false;
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
