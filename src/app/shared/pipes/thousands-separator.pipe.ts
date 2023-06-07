import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator'
})
export class ThousandsSeparatorPipe implements PipeTransform {

  transform(value: number): string {
    // Convierte el número en una cadena
    let stringValue = value.toString();

    // Divide la cadena en grupos de tres caracteres desde el final
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    stringValue = stringValue.replace(regex, ',');

    return stringValue;
  }
}
