import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ILoginFormRequest } from 'src/app/interface/Auth/Login/ILoginRequest';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<ILoginFormRequest>;
  error:string ="";
  private destroy$ = new Subject<void>();
  constructor(private authservice: AuthService,private fb:FormBuilder,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(5)]]
    });
  }
 

   OnLogin(){
    this.authservice.onLogin(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res) => { 
        if(res.message==='Success'){
          this.authservice.onLoginSubmit(res.accessToken,res.refreshToken)
        }
      },
      error: (error) => {
        this.error=error.message;
        if(error.message==="UNAUTHORIZED"){
          this.loginForm.controls.password.setErrors({apiError:true})          
        }
        if(error.message==="user doesn't exist"){
          this.loginForm.controls.email.setErrors({apiError:true})
        }
      },
    })
  }
  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
}
