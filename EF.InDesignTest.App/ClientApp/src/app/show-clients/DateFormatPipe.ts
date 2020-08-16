import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
@Injectable()
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === 'string' || value instanceof String)
      return value;
    return super.transform(value, "MMM/dd/yyyy hh:mm:ss");
  }
}
