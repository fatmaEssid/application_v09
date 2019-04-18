import { ClientDetail } from 'src/app/shared/client-detail.model';
import { FinalClient } from 'src/app/shared/final-client.model';
import { FinalClientService } from 'src/app/shared/final-client.service';
import { ClientService } from 'src/app/shared/client.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styles: []
})
export class ClientDetailsComponent implements OnInit {

  formData : ClientDetail;
  finalClientList :FinalClient[];
  isValid: boolean = true;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data ,
    public dialogRef: MatDialogRef<ClientDetailsComponent>,
    private finalClientService: FinalClientService,
    private clientService: ClientService) { }








  ngOnInit() {

    if (this.data.clientDetailIndex == null)
    this.formData = {
      client_detail_id:null,
      client_mediator:false,
      client_id:this.data.client_id,
      final_client_id:0,
      final_client_nom:'' ,
    client_adresse:'' }  
    else
      this.formData = Object.assign({}, this.clientService.clientDetails[this.data.clientDetailIndex]);
 
}
  updateName(ctrl) {
    if (ctrl.selectedIndex == 0) {
     
      this.formData.final_client_nom = 'Pas de client';
    }
    else {
      
      this.formData.final_client_nom = this.finalClientService.list[ctrl.selectedIndex - 1].final_client_nom;
    }
    
  }

   onSubmit(form: NgForm) {

      if (this.data.clientDetailIndex == null)
        this.clientService.clientDetails.push(form.value);
      else
        this.clientService.clientDetails[this.data.clientDetailIndex] = form.value;
      this.dialogRef.close();
 
  }

  validateForm(formData: ClientDetail) {
    this.isValid = true;
    if (formData.final_client_id == 0)
      this.isValid = false;
    return this.isValid;
  }
  updateFinalClient(ctrl){
    if(ctrl.selectedIndex==0)
  this.finalClientService.list=[];
 
  else
  this.finalClientService.refreshList();//.then(res => this.finalClientList = res as FinalClient[]); 
}




}//fin de la classe ClientDetailsComponent