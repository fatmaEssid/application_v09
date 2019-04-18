import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturesComponent } from './factures/factures.component';
import { FactureComponent } from './factures/facture/facture.component';
import { PageAccuielComponent } from './page-accuiel/page-accuiel.component';
import { ClientComponent } from './clients/client/client.component';
import { FinalClientComponent } from './final-client/final-client.component';

import { ClientsComponent } from './clients/clients.component';
import { FinalClientsComponent } from './final-client/final-clients/final-clients.component';
import { ContratComponent } from './contrats/contrat/contrat.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ListeComponent } from './final-client/liste/liste.component';
import { ContComponent } from './contrats/cont/cont.component';

const routes: Routes = [
  {path:'', redirectTo:'page-accuiel',pathMatch:'full'},
 // {path:'', redirectTo:'facture',pathMatch:'full'},
  {path:'factures', component:FacturesComponent},
  {path:'clients', component:ClientsComponent},
  {path:'client', component:ClientComponent},

  {path:'final-clients', component:ListeComponent},
  {path:'contrats', component:ContComponent},

  {path:'page-accuiel', component:PageAccuielComponent},
  {path:'facture', children:[
    {path:'', component:FactureComponent},
    {path:'edit/:id', component:FactureComponent}
  ]},
  {path:'client', children:[
    {path:'', component:ClientComponent},
    {path:'edit/:id', component:ClientComponent}
  ]},
  {path:'final-clients', children:[
    {path:'', component:ListeComponent},
    {path:'edit/:id', component:ListeComponent}
  ]},
  {path:'contrats', children:[
    {path:'', component:ContComponent},
    {path:'edit/:id', component:ContComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
