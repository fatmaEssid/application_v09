import { Component, OnInit } from '@angular/core';
import { ContratService } from '../shared/contrat.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Contrat } from '../shared/contrat.model';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styles: []
})
export class ContratsComponent implements OnInit {
  
  constructor(private service: ContratService,
    private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
     this.service.refreshList();
  }
    populateForm(c : Contrat){
    this.service.formData=Object.assign({}, c);
    this.router.navigate(['/contrats/edit/' + c.contrat_id]);
    }
    onDeleteContrat(id : number){
    if (confirm('etes-vous sur de supprimer le contrat')) {
    this.service.deleteContrat(id).subscribe(res =>{
      this.service.refreshList();    
      this.openSnackBar('Contrat', 'Supprimé avec succès!');
    });
  }
  }
  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 4000,
         verticalPosition: 'top',
        
         
      });
   }

}//FIN de la classe ContratComponent♀♥☻♣♦16ÜÆ²«5☻Mô╚█☻AÄ█Àƒe☻Ä╚
/*  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(c : Client){
    this.service.formData=Object.assign({}, c);

  }
  onDelete(id : number){
    if (confirm('etes-vous sur de supprimer cette record')) {
    this.service.deleteClient(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Supprimé avec succès!', 'Registre de client');
    });
  }
  }*/