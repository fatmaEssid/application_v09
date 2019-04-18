import { Component, OnInit } from '@angular/core';
import { FinalClientService } from 'src/app/shared/final-client.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FinalClient } from 'src/app/shared/final-client.model';

@Component({
  selector: 'app-final-clients',
  templateUrl: './final-clients.component.html',
  styles: []
})
export class FinalClientsComponent implements OnInit {

  //finalClientList;
  constructor(private service: FinalClientService,
    private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
   this.service.refreshList();
  }
 
  populateForm(c : FinalClient){
    this.service.formData=Object.assign({}, c);
    this.router.navigate(['/final-clients/edit/' + c.final_client_id]);
    
  }
  onDelete(id : number){
    if (confirm('Vous êtes sûr  pour supprimer le client  ?')) {
    this.service.deleteFinalClient(id).subscribe(res =>{
      this.service.refreshList();
      this.openSnackBar('CLIENT ', 'supprimé avec succès ♥☺♂♀☻☼');
    });
  }}
  /*openOrEdit(ID:number){
    this.router.navigate(['/final-client/edit/' + ID]);

  }
  onDeleteClient(id: number) {
    if (confirm('Vous êtes sûr  pour supprimer le client ?')) { 
      this.service.deleteFinalClient(id).then(res => {
        this.refreshList();
        this.openSnackBar('CLIENT ', 'supprimé avec succès ☺♂♀☻☼');
      });
    }👮👩‍🎓🐊🔥👨‍🎤🏋 🤓 🏆 🤹👮👩‍🎓🐊🔥👨‍🎤🏋
  }*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 4000,
       verticalPosition: 'top',
    
    });

}

}
/*





 refreshList(){
    this.service.getFinalClientList().then(res=>this.finalClientList = res);
  }♠♣♥♦☺☺♥
*/