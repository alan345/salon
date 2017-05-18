import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'smallDescription'})
export class SmallDescriptionPipe implements PipeTransform {
  transform(description: string): string {

    //return Math.pow(value, isNaN(exp) ? 1 : exp);
    return description.substring(0,90) + '...' 
  }
}
