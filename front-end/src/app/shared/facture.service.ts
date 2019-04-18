import { Injectable } from '@angular/core';
import { Facture } from './facture.model';
import { FactureDetail } from './facture-detail.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FactureService {
  formData : Facture;
  factureDetails : FactureDetail[];

  constructor(private http : HttpClient) { }


  saveOrUpdateOrder(){
    var body = {
      ...this.formData,
      Facture_details : this.factureDetails

    };
   return this.http.post(environment.apiURL+'/Facture', body);

  }
  getFactureList() {
    return this.http.get(environment.apiURL+'/Facture').toPromise();
   }
}
