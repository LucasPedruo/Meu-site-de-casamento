import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmacaoDePresencaComponent } from './confirmacao-de-presenca/confirmacao-de-presenca.component';
import { CerimoniaEFestaComponent } from './cerimonia-e-festa/cerimonia-e-festa.component';
import { SugestaoDeTrajeComponent } from './sugestao-de-traje/sugestao-de-traje.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'lista-de-presente', component: HomeComponent },
  { path: 'cerimonia-e-festa', component: CerimoniaEFestaComponent },
  { path: 'confirmacao-de-presenca', component: ConfirmacaoDePresencaComponent },
  { path: 'sugestao-de-traje', component: SugestaoDeTrajeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }