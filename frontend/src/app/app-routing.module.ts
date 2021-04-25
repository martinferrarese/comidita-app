import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComidasComponent } from './editor-comidas/editor-comidas.component';
import { SelectorComidaComponent } from './selector-comida/selector-comida.component';
import { SemanaComponent } from './semana/semana.component';

const routes: Routes = [
  { path: '', component: SemanaComponent },
  { path: 'lista-comidas', component: SelectorComidaComponent },
  { path: 'editar-comidas', component: EditorComidasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
