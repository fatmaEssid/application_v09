import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {
clientList;
  constructor(private service: ClientService,
    private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
   this.refreshList();
  }
  refreshList() {
    this.service.getClientList().then(res=>this.clientList = res);
  }

  openOrEdit(ID:number){
    this.router.navigate(['/client/edit/' + ID]);

  }
  onDeleteClient(id: number) {
    if (confirm('Vous êtes sûr  pour supprimer le client ?')) {
      this.service.deleteClient(id).then(res => {
        this.refreshList();
        this.openSnackBar('CLIENT', 'supprimé avec succès ');
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 4000,
       verticalPosition: 'top',
    
    });

}
}
