import { Injectable } from '@angular/core';
import { FinalClient } from './final-client.model';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinalClientService {
  formData : FinalClient;
list:FinalClient[];

  constructor(private http : HttpClient) { }

 
   getFinalClientsList(id: number){
    return this.http.get(environment.apiURL+'/Final_client/'+id).toPromise();
   }

postClient(formData : FinalClient){
   return this.http.post(environment.apiURL+'/Final_client', formData);

  }

   refreshList(){
 this.http.get(environment.apiURL+'/Final_client').toPromise().then(res => this.list = res as FinalClient[]);
  }
  putClient(formData : FinalClient){
    return this.http.put(environment.apiURL+'/Final_client/'+formData.final_client_id, formData);
  }

deleteFinalClient(id:number) {
  return this.http.delete(environment.apiURL+'/Final_client/'+id);
}
}

/*
  postClient(formData : Client){
   return this.http.post(this.rootURL+'/Client', formData);

  }
  refreshList(){
    this.http.get(this.rootURL+'/Client')
    .toPromise().then(res => this.list = res as Client[])
  }

  putClient(formData : Client){
    return this.http.put(this.rootURL+'/Client/'+formData.ID, formData);
  }
   deleteClient(id : number){
     return this.http.delete(this.rootURL+'/Client/'+id);
   }
*/