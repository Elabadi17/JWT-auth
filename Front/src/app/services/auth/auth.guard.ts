import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.authService.isLoggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return true; // Autoriser l'accès si l'utilisateur est authentifié
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page d'accueil si l'utilisateur n'est pas authentifié
      return false; // Bloquer l'accès
    }
  }
}
