import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aproximar'
})
export class AproximarPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value);
  }

}
