import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder, private http: HttpClient) { // Injection de HttpClient
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required]
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
      // Envoi des données au backend
      this.http.post<any>('http://localhost:8080/auth/addNewUser', this.userForm.value,httpOptions).subscribe(
        response => {
          console.log('User added successfully:', response);
          this.router.navigate(['/login']);

          
          // Ici, vous pouvez ajouter une logique pour traiter la réponse ou rediriger l'utilisateur, etc.
        },
        error => {
          console.log('data:',this.userForm.value);
          console.error('Error adding user:', error);
          // Ici, vous pouvez gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
    }
  }
}