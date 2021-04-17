import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComidaComponent } from './selector-comida/selector-comida.component';
import { SemanaComponent } from './semana/semana.component';

const routes: Routes = [
  { path: '', component: SemanaComponent },
  { path: 'lista-comidas/:idDia', component: SelectorComidaComponent },
  { path: 'semana/:idComida', component: SemanaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
