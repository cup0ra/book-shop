/* eslint-disable no-nested-ternary */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, field: any, isField: boolean) {
    return array.sort((a: any, b: any) =>
      isField
        ? a[field] > b[field]
          ? -1
          : b[field] > a[field]
          ? 1
          : 0
        : a[field] > b[field]
        ? 1
        : b[field] > a[field]
        ? -1
        : 0,
    );
  }
}
