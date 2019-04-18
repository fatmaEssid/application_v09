import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from './client.model';
import { ClientDetail } from './client-detail.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  formData : Client;
  clientDetails : ClientDetail[];

  constructor(private http:HttpClient) { }

  saveOrUpdateClient(){
    var body = {
      ...this.formData,
      Client_details : this.clientDetails

    };
   return this.http.post(environment.apiURL+'/Client', body);

  }

 getClientList() {
    return this.http.get(environment.apiURL+'/Client').toPromise();
  
}

 getClientByID(id:number):any {
    return this.http.get(environment.apiURL + '/Client/'+id).toPromise();
  }

  deleteClient(id:number) {
    return this.http.delete(environment.apiURL + '/Client/'+id).toPromise();
  }
 }

