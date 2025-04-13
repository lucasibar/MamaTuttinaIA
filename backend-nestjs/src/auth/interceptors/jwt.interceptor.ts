import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error.name === 'TokenExpiredError') {
          return throwError(() => new UnauthorizedException('Token expirado. Por favor, inicie sesión nuevamente.'));
        }
        if (error.name === 'JsonWebTokenError') {
          return throwError(() => new UnauthorizedException('Token inválido. Por favor, inicie sesión nuevamente.'));
        }
        return throwError(() => error);
      }),
    );
  }
} 