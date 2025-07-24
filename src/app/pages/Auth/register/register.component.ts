import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterFormRequest } from 'src/app/interface/Auth/Register/IRegisterRequest';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
 registerForm:FormGroup<IRegisterFormRequest>;
 error:string="";
 constructor(private authService:AuthService,private fb:FormBuilder,private snackbar:MatSnackBar){
  this.registerForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password : ['',[Validators.required,Validators.minLength(5),]],
        username : ['',[Validators.required,Validators.pattern("^[A-Z][a-zA-Z0-9]*$"),Validators.minLength(3),Validators.maxLength(20)]],
        firstName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern("^[A-Z][a-zA-Z]*$")]],
        lastName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern("^[A-Z][a-zA-Z]*$")]],
      });
 }
 OnRegister(){
   this.authService.onRegister(this.registerForm.value).pipe(takeUntil(this.destroy$)).subscribe({
     next:(res) => {
        this.snackbar.open("user created","pls login",{
          duration:2000,
          horizontalPosition:'end'
        })
      },
      error: (error) => {
        this.error=error.message;
        if(error.message==="email already exist"){
          this.registerForm.controls.email.setErrors({apiError:true})          
        }
        if(error.message==="UserName already taken"){
          this.registerForm.controls.username.setErrors({apiError:true})
        }
      },
    })
 }
 getUsernameError(){
  return  this.registerForm.controls.username.errors
 }
 getFirstNameError(){
  return  this.registerForm.controls.firstName.errors
 }
 getLastNameError(){
  return  this.registerForm.controls.lastName.errors
 }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
}
