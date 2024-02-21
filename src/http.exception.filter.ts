import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const mydata = exception.message;

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                status: "fail",
                data: mydata,
                code: status,
            });
    }
}