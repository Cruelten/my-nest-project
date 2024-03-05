import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BooksSchema } from './schemas/books.schema';
import { MongooseModule } from '@nestjs/mongoose';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
     imports: [
            MongooseModule.forFeature([
                    { name: Book.name, schema: BooksSchema }
                ]
            )
          ],
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksService = await app.resolve<BooksService>(BooksService);
  });

  describe('root', () => {
    it('adds a book"', () => {
      const book = new Book;
      booksService.create(book);
      const books = booksService.getAll();
      expect(books).toHaveLength(1)
    });
  });
});
