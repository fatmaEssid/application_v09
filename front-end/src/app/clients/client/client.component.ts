import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from 'src/app/shared/client.service';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {
 
  constructor(private service:ClientService,
    private router:Router,
    private dialog:MatDialog,
    private currentRoute: ActivatedRoute,
    public snackBar: MatSnackBar) { }


  ngOnInit() {

    
    this.resetForm();

      let client_id = this.currentRoute.snapshot.paramMap.get('id');
   if (client_id == null)
      this.resetForm();
    else {
      this.service.getClientByID(parseInt(client_id)).then(res => {
        this.service.formData = res.client;
        this.service.clientDetails = res.clientDetails;
      });
    }


   
  }
  resetForm(form?:NgForm){
 
    if(form = null)
    this.resetForm(form);
    this.service.formData = {
    client_id:null,
    client_nom :'',
    client_adresse:'',
    client_siret:0,
    client_TVA:0,
    client_email:'',
    DeletedDetailClientIDs:''
    };
    this.service.clientDetails= [];
  }

    
   AddOrEditClientFinal(clientDetailIndex,client_id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { clientDetailIndex,client_id };
    this.dialog.open(ClientDetailsComponent, dialogConfig);
   
  }


  onDeleteDetailClient(clientDetailID: number, i: number) {
    if (clientDetailID != null)
    this.service.formData.DeletedDetailClientIDs += clientDetailID + ",";
    this.service.clientDetails.splice(i, 1);
  }
 

    onSubmit(form: NgForm) {
    
        this.service.saveOrUpdateClient().subscribe(res => {
        this.resetForm();
        this.openSnackBar('CLIENT', 'Submitted Successfully');
        this.router.navigate(['/clients']);
      })
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
    
    });
 } 



  }



