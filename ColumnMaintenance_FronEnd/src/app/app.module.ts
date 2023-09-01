import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchColumnsComponent } from './search-columns/search-columns.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { AddColumnComponent } from './add-column/add-column.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewColumnComponent } from './view-column/view-column.component';
import { EditColumnComponent } from './edit-column/edit-column.component';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchColumnsComponent,
    SearchPipe,
    AddColumnComponent,
    ViewColumnComponent,
    EditColumnComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
