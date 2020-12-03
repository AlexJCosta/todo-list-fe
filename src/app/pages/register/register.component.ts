import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/entities/user';
import { ApiService } from 'src/app/core/services/Apiservice';
import { AuthService } from 'src/app/core/services/authService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.email])],
      email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.email])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {    
    const formModel = this.registerForm.value;    

    const obj: User = { 
      id: null,       
      name: formModel.name,
      email: formModel.email,
      password: formModel.password    
    }

    this.apiService.save('users', obj).then(
      (success) => {
          this.toastr.success('', 'User created!');                    
          this.registerForm.reset(success);
          this.router.navigate(['/lists']);
      },
      (error) => {
          this.toastr.error('Oops! An error has occurred on the server.');
          //console.log(error);
      });      
  }

}
