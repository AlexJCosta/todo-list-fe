import { ElementRef } from '@angular/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/apiService';
import { MyListComponent } from './my-list.component';

@Component({
  selector: 'app-share-list.dialog',
  templateUrl: './share-list.dialog.component.html',
  styleUrls: ['./share-list.dialog.component.scss']
})
export class ShareListDialogComponet implements OnInit {
  
    @ViewChild('emailInput') emailInput: ElementRef;

    _component: MyListComponent;    
    emails = [];

    constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public comp: MyListComponent,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { 
    this._component = comp;    
    }    

    ngOnInit(): void {        
    }    

    addEmail(): void {
      this.emails.push(this.emailInput.nativeElement.value)
      this.emailInput.nativeElement.value = "";
    }

    removeEmail(value: any): void {      
        const index: number = this.emails.indexOf(value);
        this.emails.splice(index, 1);      
    }

    sendEmails(): void {
      this._apiService.sendEmails('users', this.emails).then(data => {
        this.toastr.success('', 'List shared with emails!');
        this.close();
      });
    }

    _idValidator(data: any): number {
      if (data != undefined) {
        return data.id;
      }else{
        return null;
      }
    }   

    close() {        
      this._component.dialog.closeAll();      
    }

}