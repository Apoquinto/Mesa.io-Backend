import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ParseArrayPipe } from '@nestjs/common';

@Injectable()
export class EmptyArrayToNullPipe
  extends ParseArrayPipe
  implements PipeTransform<any>
{
  transform(value: any, metadata: ArgumentMetadata): any {
    if (value === '') {
      return null;
    }
    return super.transform(value, metadata);
  }
}
