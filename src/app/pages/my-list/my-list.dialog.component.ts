import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/core/entities/item';
import { List } from 'src/app/core/entities/list';
import { ApiService } from 'src/app/core/services/Apiservice';
import { MyListComponent } from './my-list.component';

@Component({
  selector: 'app-my-list.dialog',
  templateUrl: './my-list.dialog.component.html',
  styleUrls: ['./my-list.dialog.component.scss']
})
export class MyListDialogComponet implements OnInit {
    
    _component: MyListComponent;
    _list: List;

    @ViewChild('form') itemNgForm: any;
    itemForm: FormGroup;
    _defaultFormValues: any;
    typeOperation = "";
    _idItem = null;
    _idToDo = null;

    constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public comp: MyListComponent,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { 
    this._component = comp;
    this._createForm();               
    this._setTypeOperation(data);
    }    

    ngOnInit(): void {        
    }

    _setTypeOperation(data: any) {
      if (data.type == 'Update') {
        this.typeOperation = data.type + " Item";        
        this.itemForm.reset(data.data);
        this._idItem = data.data.id;
        this._idToDo = data.data.toDoId;        
      }else{        
        this.typeOperation = data.type + " Item";
        this._idItem = null;
        console.log(data);
        this._idToDo = data.data.id;        
      }      
    }

    _createForm(): void {
        this.itemForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]      
        });
    
        this._defaultFormValues = this.itemForm.getRawValue();    
      }
    
    onSubmit(): void {       
        this._processForm();  
    }

    _idValidator(data: any): number {
      if (data != undefined) {
        return data.id;
      }else{
        return null;
      }
    }

    _processForm(): void {
        const formModel = this.itemForm.value;
        
        const obj: Item = { 
            id: this._idItem,       
            name: formModel.name,
            toDoItemUserId: "dac34c51-8c03-44df-9228-fe76d29f8b0d",
            toDoId: this._idToDo
        }
    
        this._save(obj);
    }

    _save(obj: Item): void {
        if (this._idItem != null) {
          this._apiService.update('toDoItems', obj).then(
            (success) => {
              this.toastr.success('', 'Item updated!');                
              this._component.dialog.closeAll();    
              this.itemForm.reset(success);
            },
            (error) => {
                this.toastr.error('', 'Oops! An error has occurred on the server.');                
                console.log(error);
            });
        }else{
          this._apiService.save('toDoItems', obj).then(
            (success) => {
              this.toastr.success('', 'Item created!');

                //this.notification.showNotification('top','center', 'Item created!');
                this._component.dialog.closeAll();
    
                //this.showLists(this.listForm.value.name);
                this.itemForm.reset(success);
            },
            (error) => {
                this.toastr.success('', 'Oops! An error has occurred on the server.');                
                console.log(error);
            });
        }
    }

    close() {        
      this._component.dialog.closeAll();      
    }

}