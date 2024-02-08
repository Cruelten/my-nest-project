import { Injectable } from '@nestjs/common';

import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from "./schemas/books.schema";
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    public create(data: CreateBookDto): Promise<BookDocument> {
        const book = new this.BookModel(data);

        return book.save();
    }

    public getAll(): Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    public update(id: string, data: UpdateBookDto): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndUpdate(
            { _id: id },
            data,
        );
    }

    public delete(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndRemove({ _id: id });
    }
}
