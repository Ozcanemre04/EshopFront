import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth  = inject(AuthService);
  let connected:Boolean =false;
  
   auth.connected.subscribe({next(value) {
        connected = value;
  },})
  if(connected){
    return true;

  }
  else{
    router.navigateByUrl('/login');
    return false;
  }
    
};
