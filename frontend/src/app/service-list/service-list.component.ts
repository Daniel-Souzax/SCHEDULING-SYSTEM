import {Component, OnInit} from '@angular/core';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../api.service';
import { Service } from './service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-service-list',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],  
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
  
})
export class ServiceListComponent implements OnInit{
  
  readonly df = new Date(1990, 0, 1);
  public serviceSelect: Service = {
    name: '',
    duration: ''
  }
  public dataAgenda: any; 
  public services: Service[] = [];
  private snackBar: any;

  constructor(private api: ApiService) {}
  
  async ngOnInit() {
    this.services = await this.getServices();    
    
  }

  private async getServices(): Promise<Service[]> {
    try {
      return await firstValueFrom(this.api.listServices());
    } catch (erro: any) {
      const mensageErro = erro.error?.message;
      this.snackBar.open(mensageErro, 'Fechar', {
        duration: 2000, 
        panelClass: ['snackbar-error'] ,
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });      
      console.log(erro);
      return [
        {
          name: 'Não foi possível carregar os serviços',
          duration: 'Não foi possível carregar os serviços',
        } as Service,
      ];
    }
  }

  public clickAgend(){

  }

}
