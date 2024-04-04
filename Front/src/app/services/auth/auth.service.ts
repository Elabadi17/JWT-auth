import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }
  saveToken(token: string): void {
    localStorage.setItem('token', token);

    // Définir un délai d'une heure pour supprimer le jeton
    setTimeout(() => {
      this.logout();
    }, 3600000); // 1 heure en millisecondes
  }


  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (!token) {
        resolve(false); // Si le jeton n'existe pas, l'utilisateur n'est pas authentifié
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ajouter le jeton dans l'en-tête Authorization
        })
      };
      console.log(`Bearer ${token}`);
      // Envoyer une requête HTTP GET au serveur pour vérifier l'authenticité du jeton
      this.http.get<any>('http://localhost:8080/auth/user/userProfile', httpOptions).subscribe(
        response => {
          console.log('User authenticated successfully:', response);
          resolve(true); // Si la réponse est réussie, l'utilisateur est authentifié
        },
        error => {
          console.error('User authentication failed:', error);
          resolve(false); // Si la réponse est en erreur, l'utilisateur n'est pas authentifié
        }
      );
    });
  }
  logout(): void {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');
    this.router.navigate(['/']); // Assurez-vous que '/' est la route de votre page d'accueil

  }

}
