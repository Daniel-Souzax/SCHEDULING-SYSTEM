import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login/login';
import { registerUser } from './register-user/register-user';
import { Service } from './service-list/service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API = 'http://localhost:3333/api';

  constructor(private http: HttpClient) { }

  public getLogin(login: Login){            
    return this.http.post(`${this.API}/auth/user/login`, { email: login.email, password: login.password })
  }

  public registerUser(register: registerUser){   
    return this.http.post(`${this.API}/auth/user/register`, { name:register.name, email: register.email, password: register.password })
  }

  public listServices(){
    const token = sessionStorage.getItem('token');          
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Service[]>(`${this.API}/services`, {headers} );
  } 
}
