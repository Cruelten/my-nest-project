import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MyValidationPipe implements PipeTransform {
  transform(mynumber: any, metadata: ArgumentMetadata) {
    if (mynumber < 10) {
      throw new Error('Error!');
    }
    else {
        return 'It is OK';
    }
  }
}