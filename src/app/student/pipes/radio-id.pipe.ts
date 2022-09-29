import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'radioId'
})
export class RadioIdPipe implements PipeTransform {

  transform(id: string, valueType: string): string {
    let intId = Number(id);

    if (valueType === 'negative') {
      return `radio-${intId}`;
    } else {
      return `radio${intId}`;
    }
  }

}
