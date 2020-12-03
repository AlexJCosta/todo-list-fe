import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ListDialogComponet } from './pages/lists/list.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListsComponent } from './pages/lists/lists.component';
import { NotificationUtilComponent } from './core/util/notifications.util.componet';
import { MyListComponent } from './pages/my-list/my-list.component';
import { MyListDialogComponet } from './pages/my-list/my-list.dialog.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ShareListDialogComponet } from './pages/my-list/share-listiDalog.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,    
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot(),
    RouterModule   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent  
  ],
  providers: [
    ShareListDialogComponet,
    MyListComponent,
    MyListDialogComponet,
    ListDialogComponet, 
    ListsComponent,
    FormsModule,
    ReactiveFormsModule, 
    NotificationUtilComponent       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
