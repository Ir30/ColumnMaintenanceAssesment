import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddColumnComponent } from './add-column/add-column.component';
import { SearchColumnsComponent } from './search-columns/search-columns.component';
import { ViewColumnComponent } from './view-column/view-column.component';
import { EditColumnComponent } from './edit-column/edit-column.component';

const routes: Routes = [
  {path:"",component:SearchColumnsComponent},
  {path:"addColumn",component:AddColumnComponent},
  {path:"viewColumns",component:ViewColumnComponent},
  {path:"editColumn",component:EditColumnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
