import { Pipe, PipeTransform } from '@angular/core';
import {Country} from './geonames.service';
@Pipe({name: 'sortCountriesByPopulation'})
export class SortCountriesByPopulationPipe implements PipeTransform {
  transform(value: Country[], limit:number): Country[] {
    if ( value == null ) return [];
    value.sort( (a,b) => -1*(parseInt(a.population) - parseInt(b.population) ) );
    var result:Country[];
    result = [];
    var otherCountry = new Country();
    otherCountry.countryName = 'other';
    var population = 0;
    var areaInSqKm = 0;
    var i = 0;
    for ( var key in value ) {
      var el = value[key];
      if ( i < limit ) {
          result.push(el);
      }
      else {
        population += parseInt(el.population);
        areaInSqKm += parseInt(el.areaInSqKm);
      }
      i++;
    }
    if ( population > 0 ) {
      otherCountry.population = population.toString();
      otherCountry.areaInSqKm = areaInSqKm.toString();
      result.push(otherCountry);
    }
    return result;
  }
}
