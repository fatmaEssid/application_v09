import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/shared/facture.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FactureDetailsComponent } from '../facture-details/facture-details.component';
import { ClientService } from 'src/app/shared/client.service';
import { Client } from 'src/app/shared/client.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styles: []
})
export class FactureComponent implements OnInit {
  clientList:Client[];
  isValid : boolean = true;

  constructor(private service:FactureService, private dialog:MatDialog,
    private clientService:ClientService, private toastr:ToastrService, private router:Router,private currentRouter:ActivatedRoute) { }

  ngOnInit() {
   /* let ID=this.currentRouter.snapshot.paramMap.get('id');
    this.resetForm();
    this.clientService.getClientList().then(res=> this.clientList = res as Client[]);*/
  }
 /* resetForm(form?:NgForm){
    let d = new Date();
    if(form = null)
    this.resetForm(form);
    this.service.formData = {
      Fact_id:0,
    Fact_num :Math.floor(100000+Math.random()*900000).toString(),
    Client_id :0,
    Mois:new Date().getMonth() +1,
    Date_envoie: (d.getDate()).toString() +'/'+(d.getMonth()+1).toString() +'/'+(d.getFullYear()).toString(),
    PMethod :'',
    GTotal :0,
    };
    this.service.factureDetails=[];
  }
  addOrEditFactDetail(factDetailIndex, Fact_id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose =true ;
    dialogConfig.width="50%";
    dialogConfig.data = {factDetailIndex,Fact_id};
    this.dialog.open(FactureDetailsComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.UpdateGrandTotale();
    });

  }
  onDeleteFactDetail(Fact_detail_id :number, i: number){
    this.service.factureDetails.splice(i,1);
    this.UpdateGrandTotale();
  }
  UpdateGrandTotale(){
    this.service.formData.GTotal = this.service.factureDetails.reduce((prev, curr)=> {
      return prev + curr.Total;
    },0);
    this.service.formData.GTotal=parseFloat((this.service.formData.GTotal).toFixed(2)) ;
  }
  validateForm(){
    this.isValid=true;
    if(this.service.formData.Client_id == 0)
    this.isValid=false;
    else if(this.service.factureDetails.length == 0)
    this.isValid=false;
    return this.isValid;
  }
  onSubmit(form: NgForm){
    if(this.validateForm()){
      this.service.saveOrUpdateOrder().subscribe(res=> {
        this.resetForm();
        this.toastr.success('Bien Enregistrée', 'FACTURE');
        this.router.navigate(['/factures']);
      })
    }


  }*/
}
