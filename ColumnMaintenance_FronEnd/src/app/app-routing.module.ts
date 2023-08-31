import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddColumnComponent } from './add-column/add-column.component';
import { SearchColumnsComponent } from './search-columns/search-columns.component';

const routes: Routes = [
  {path:"",component:SearchColumnsComponent},
  {path:"addColumn",component:AddColumnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
