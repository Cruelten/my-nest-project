import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    public title: string;

    @Prop()
    public author: string;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
