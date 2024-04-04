import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  userForm: FormGroup;


  constructor(private auth: AuthService,private router: Router,private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post<any>('http://localhost:8080/auth/generateToken', this.userForm.value,httpOptions).subscribe(
        response => {
          console.log('User authenticated successfully:', response);
          // Stocker le token JWT dans le localStorage
          this.auth.saveToken(response.token);
          // Rediriger vers la page du dashboard
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error authenticating user:', error);
          // Gérer l'erreur ici
        }
      );


}
  }}