import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ListsComponent } from '../../pages/lists/lists.component';
import { MyListComponent } from 'src/app/pages/my-list/my-list.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [    
    { path: 'user-profile',  component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'lists',         component: ListsComponent,  canActivate: [AuthGuard] },
    { path: 'my-list/:name', component: MyListComponent, canActivate: [AuthGuard] }

];
