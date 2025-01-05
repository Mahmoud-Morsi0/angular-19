import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../servises/token.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const url=new URL(req.url);
  if(url.hostname === 'brite.ai.com'){
    return next(req);
  }
  const authService=inject(TokenService);
  const token = authService.getTokenValue();
  if (token) {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  return next(req);

};
