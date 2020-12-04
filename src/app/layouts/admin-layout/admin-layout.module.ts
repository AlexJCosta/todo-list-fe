import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListsComponent } from 'src/app/pages/lists/lists.component';
import { ListDialogComponet } from 'src/app/pages/lists/list.dialog.component';
import { MyListDialogComponet } from 'src/app/pages/my-list/my-list.dialog.component';
import { MyListComponent } from 'src/app/pages/my-list/my-list.component';
import { ShareListDialogComponet } from 'src/app/pages/my-list/share-listiDalog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [    
    UserProfileComponent,
    ListsComponent,
    ListDialogComponet,
    MyListComponent,
    MyListDialogComponet,
    ShareListDialogComponet    

  ]
})

export class AdminLayoutModule {}
