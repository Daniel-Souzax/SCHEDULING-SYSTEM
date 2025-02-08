import { Component } from '@angular/core';
import { registerUser } from './register-user';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-register-user',
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  public registerUser: registerUser = {
    name: '',
    email: '',
    password: ''
  }

  public mensagemErro = '';

  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) {

  }

  public async register() {
    try {    
      await firstValueFrom(this.api.registerUser(this.registerUser))
      this.router.navigate(['login'])
    } catch (erro: any) {
      this.mensagemErro = erro.error?.message
      this.snackBar.open(this.mensagemErro, 'Fechar', {
        duration: 2000, 
        panelClass: ['snackbar-error'] ,
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });
      console.log(erro);
    }
  }

}

