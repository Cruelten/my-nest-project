import {
    CallHandler,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    InternalServerErrorException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                tap(() => {
                    console.log(
                        {
                            status: "success",
                            data: context.getHandler().name  // данные из контроллера
                        }
                    );
                }),
                catchError(err => {
                    console.log(
                        {
                            status: "fail",
                            data: err // сведения об ошибке
                        }
                    );
                    return throwError(() => new InternalServerErrorException());
                })
            );
    }

}