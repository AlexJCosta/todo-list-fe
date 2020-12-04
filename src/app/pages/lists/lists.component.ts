import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/authService';
import { ListDialogComponet } from './list.dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  myLists = [];  
  currentUser = null;

  constructor(
    public dialog: MatDialog,
    private _apiService: ApiService,
    private _router: Router,
    private toastr: ToastrService,
    private autService: AuthService
  ) {
    this.loadLists();
    this.loadUser();
   }

  ngOnInit() {
  }

  loadUser() {
    this._apiService.getById('users', this.autService.currentUserValue.id).then(i => {
      this.currentUser = i;
    });
  }

  loadLists() {    
    this._apiService.getAllByUserId('todos', this.autService.currentUserValue.id).then(i => {            
      this.myLists = i.todo;         
    });
  }

  openDialog() {    
    const dialogRef = this.dialog.open(
      ListDialogComponet, {
        data: null,
        height: 'auto',
        width: '600px',
      }
      );

    dialogRef.afterClosed().subscribe(data => {          
      this.loadLists();
    });  
  }

  showLists(list: any) {    
    //const param = this.formatToParam(name);
    this._router.navigate(['/my-list', list.name]);    
  }

  formatToParam(name: string): string {
    return name.split(' ').join('-');
    //return name.replace(' ', '-').toLowerCase();
  }

  delete(it: any): void {
    this._apiService.delete('toDos', it.id).then(i => {
      this.toastr.success('', 'List deleted!');
      this.loadLists();
    });
  }

}
