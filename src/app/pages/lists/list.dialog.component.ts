import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { List } from 'src/app/core/entities/list';
import { ApiService } from '../../core/services/apiService';
import { AuthService } from 'src/app/core/services/authService';
import { ListsComponent } from './lists.component';

@Component({
  selector: 'app-tables',
  templateUrl: './list.dialog.component.html',
  styleUrls: ['./list.dialog.component.scss']
})
export class ListDialogComponet implements OnInit {

  _component: ListsComponent;
  _list: List;

  @ViewChild('form') listNgForm: any;
  listForm: FormGroup;
  _defaultFormValues: any;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public comp: ListsComponent,    
    private _router: Router,
    private toastr: ToastrService,
    private autService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this._component = comp;
    this._createForm();
  }

  ngOnInit() {
  }

  _createForm(): void {
    this.listForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]      
    });

    this._defaultFormValues = this.listForm.getRawValue();    
  }

  onSubmit(): void {       
    this._processForm();  
  }

  _processForm(): void {
    const formModel = this.listForm.value;
    
    const obj: List = { 
        id: null,       
        name: formModel.name,
        toDoUserId: this.autService.currentUserValue.id
    }

    this._save(obj);
  }

  _save(obj: List): void {
    if (obj.id != null) {
      // TODO
    }else{
      this._apiService.save('toDos', obj).then(
        (success) => {
          this.toastr.success('', 'List created!');
            this._component.dialog.closeAll();

            this.showLists(this.listForm.value.name);
            this.listForm.reset(success);
        },
        (error) => {
            this.toastr.error('Oops! An error has occurred on the server.');
            console.log(error);
        });
    }
  }

  showLists(name: string) {    
    const param = this.formatToParam(name);
    this._router.navigate(['/my-list', param]);    
  }

  formatToParam(name: string): string {
    return name.split(' ').join('-');    
  }

  close() {        
    this._component.dialog.closeAll();
    
  }

}
