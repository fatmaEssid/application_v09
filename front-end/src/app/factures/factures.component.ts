import { Component, OnInit } from '@angular/core';
import { FactureService } from '../shared/facture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styles: []
})
export class FacturesComponent implements OnInit {
factureList;
  constructor(private service:FactureService,
    private router:Router) { }

  ngOnInit() {
    this.service.getFactureList().then(res=>this.factureList = res);
  }
  openOrEdit(ID:number){
    this.router.navigate(['/facture/edit/' + ID]);

  }

}
