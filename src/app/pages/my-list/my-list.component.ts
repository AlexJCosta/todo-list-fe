import { Component, OnInit, ɵConsole } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/Apiservice';
import { MyListDialogComponet } from './my-list.dialog.component';
import { ShareListDialogComponet } from './share-listiDalog.component';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  nameList = "";
  myToDo = null;
  myItems = [];

  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private toastr: ToastrService
  ) { 
    this.nameList = this._route.snapshot.params['name'];  
    this.loadLists();
  }

  ngOnInit(): void {
  }

  loadLists() {
    this._apiService.getByName('toDos', this.nameList).then(i => {            
      this.myItems = i.toDoItemsToDo;   
      this.myToDo = i;      
    });
  }

  delete(it: any): void {
    this._apiService.delete('toDoItems', it.id).then(i => {
      this.toastr.success('', 'Item deleted!');
      this.loadLists();
    });
  }

  edit(it: any): void {
    const dialogRef = this.dialog.open(
      MyListDialogComponet, {
        data: {data: it,  type: 'Update'},       
        height: 'auto',
        width: '600px',
      }
    );

    dialogRef.afterClosed().subscribe(data => {          
      this.loadLists();
    });    
  }

  openShareListDialog() {
    const dialogRef = this.dialog.open(
      ShareListDialogComponet, {
        data: this.myToDo,
        height: 'auto',
        width: '600px',
      }
      );

    dialogRef.afterClosed().subscribe(data => {          
      this.loadLists();
    });    
  }

  openDialog() {  
    console.log(this.myToDo);
    const dialogRef = this.dialog.open(
      MyListDialogComponet, {
        data: {data: this.myToDo,  type: 'New'},
        height: 'auto',
        width: '600px',
      }
      );

    dialogRef.afterClosed().subscribe(data => {          
      this.loadLists();
    });  
  }
}
