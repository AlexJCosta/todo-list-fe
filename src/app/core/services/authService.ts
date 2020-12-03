import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from "../guards/config";
import { Router } from '@angular/router';
import { Auth } from '../entities/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private url: string;
    private currentUserSubject: BehaviorSubject<Auth>;
    public currentUser: Observable<Auth>;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService
    ) {                
        if (localStorage.getItem('currentUserId')) {
            this.currentUserSubject = new BehaviorSubject<Auth>(
                new Auth(localStorage.getItem('currentUserId'), localStorage.getItem('currentUserAccessToken')));
        }
        else {
            this.currentUserSubject = new BehaviorSubject<Auth>(null);
        }
        this.currentUser = this.currentUserSubject.asObservable();
        this.url = config.baseUrl;
    }

    login(email: string, password: string, rota: string) {          
        this.http.get(this.url + 'signin', { headers: { email: email, password: password } }).subscribe(
            (r) => {                
                this.currentUserSubject.next({ id: r["result"].user.id, token: r["token"] });
                localStorage.setItem('currentUserId', r["result"].user.id);
                localStorage.setItem('currentUserAccessToken', r["token"]);
                this.router.navigate([rota]);
                return true;
            },
            (erro) => {
                this.toastr.error('', 'Login failed!');
                this.router.navigate(['/']);
                return false;
            }
        );       
    }

    logout() {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUserAccessToken');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
    }

    public get currentUserValue(): Auth {
        return this.currentUserSubject.value;
    }

}