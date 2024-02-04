import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interace';

@Injectable()
export class BooksService  {
    private readonly books: Book[] = [
        {
            title: "Война и мир",
            author: "Лев Толстой",
        }, 
        {
            title: "Маска красной смерти",
            author: "Эдгар Аллан По",
        },
        {
            title: "Евгений Онегин",
            author: "Александр Пушкин",
        }
    ];

    findAll(): Book[] {
        return this.books;
    }
}