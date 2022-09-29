import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseToInt'
})
export class ParseToIntPipe implements PipeTransform {

  transform(id: string): number {
    return Number(id);
  }

}
