import { Controller, Post, Body, Get, Put, Param, Delete, UsePipes, HttpException, UseFilters } from '@nestjs/common';
import {ValidationPipe} from "./validation/validation.pipe";
import {LoginDto} from "./dto/login.dto";
import { BookDocument } from './schemas/books.schema';
import { BooksService } from './books.service';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { IParamId } from './interfaces/param-id';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { HttpExceptionFilter } from '../http.exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Post()
    public create(@Body() body: CreateBookDto): Promise<BookDocument> {
        return this.bookService.create(body);
    }

    @Get()
    public getAll(): Promise<BookDocument[]> {
        return this.bookService.getAll();
    }

    @Put(':id')
    public update(
        @Param() { id }: IParamId,
        @Body() body: UpdateBookDto,
    ): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.bookService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param() { id }: IParamId): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        if(id == 'wrong-test') {
            throw new HttpException('Oops', 401);
        }
        else {
            return this.bookService.delete(id);
        }

    }

    @UsePipes(new ValidationPipe())
    @Post('/login')
    login(@Body() body: LoginDto) {
      return body;
    }
}



