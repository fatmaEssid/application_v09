import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FactureDetail } from 'src/app/shared/facture-detail.model';
import { ContratService } from 'src/app/shared/contrat.service';
import { Contrat } from 'src/app/shared/contrat.model';
import { NgForm } from '@angular/forms';
import { FactureService } from 'src/app/shared/facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styles: []
})
export class FactureDetailsComponent implements OnInit {
formData : FactureDetail;
contratList :Contrat[];
isValid : boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data ,
    public dialogRef: MatDialogRef<FactureDetailsComponent>,
    private contratService: ContratService,
    private factureService:FactureService) { }

  ngOnInit() {
   /*this.contratService.getContratList().then(res => this.contratList = res as Contrat[] );
    if(this.data.factDetailIndex == null){
    this.formData = {
      Fact_detail_id: null,
      Fact_id:this.data.Fact_id,
      Contrat_id:0,
      Quantity:0,
      TVA:0.2,
      Description:'',
      Price:0,
      Total:0

    }
  }else 
  this.formData =Object.assign({},this.factureService.factureDetails[this.data.factDetailIndex]) ;
  }



  updatePrice(ctrl) {
    if(ctrl.selectedIndex == 0){
      this.formData.Price =0;
      this.formData.Description='';

    }
    else {
      this.formData.Price = this.contratList[ctrl.selectedIndex-1].Price;
      this.formData.Description = this.contratList[ctrl.selectedIndex-1].Description;
    }
    this.updateTotal();
  }
  updateTotal(){
    this.formData.Total=parseFloat(((this.formData.Quantity * this.formData.Price * 0.2) + this.formData.Quantity * this.formData.Price).toFixed(2)) ;
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
      if(this.data.factDetailIndex == null)
    this.factureService.factureDetails.push(form.value);
    else
    this.factureService.factureDetails[this.data.factDetailIndex] = form.value;
    this.dialogRef.close();
    
  }

  }
  validateForm(formData:FactureDetail){
    this.isValid =true ;
    if(formData.Contrat_id==0)
     this.isValid=false;
    if(formData.Quantity==0)
     this.isValid=false;
    return this.isValid;*/
  }
  

}
