import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoModule } from './projeto/projeto.module';7


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: ''},
  {path:'projeto', loadChildren:()=> ProjetoModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
