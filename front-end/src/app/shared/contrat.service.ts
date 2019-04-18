import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contrat } from './contrat.model';


@Injectable({
  providedIn: 'root'
})
export class ContratService {
  formData: Contrat;
    list: Contrat[];
  constructor(private http: HttpClient) { }



postContrat(formData : Contrat){
   return this.http.post(environment.apiURL+'/Contrat', formData);

  }
  refreshList(){
    this.http.get(environment.apiURL+'/Contrat')
    .toPromise().then(res => this.list = res as Contrat[]);
  }

  putContrat(formData : Contrat){
    return this.http.put(environment.apiURL+'/Contrat/'+formData.contrat_id, formData);
  }
   deleteContrat(id : number){
     return this.http.delete(environment.apiURL+'/Contrat/'+id);
   }

}
