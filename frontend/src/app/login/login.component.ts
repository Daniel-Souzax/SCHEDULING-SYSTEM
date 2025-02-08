import { Component } from '@angular/core';
import { Login } from './login';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  public login: Login = {
    email: '',
    password: ''
  }

  public token: string = '';

  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) { }


  public async userLogin() {    
    try {
      const returnLogin: any = await firstValueFrom(this.api.getLogin(this.login))          
      this.token = returnLogin.token;
      
      sessionStorage.setItem('token', this.token);

      this.router.navigate(['service-list'])
      
    } catch (erro: any) {
      const mensageErro = erro.error?.message;
      this.snackBar.open(mensageErro, 'Fechar', {
        duration: 2000, 
        panelClass: ['snackbar-error'] ,
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });
      console.log(erro);      
    }
  }
}
