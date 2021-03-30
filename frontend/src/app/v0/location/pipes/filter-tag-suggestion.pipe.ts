import { Pipe, PipeTransform } from '@angular/core';
import {ITag} from '../../@entities/ITag';

@Pipe({
  name: 'filterTagSuggestion'
})
export class FilterTagSuggestionPipe implements PipeTransform {

transform(value: Array<ITag>,   args: Array<ITag>): Array<ITag> {
    const res = value.filter(v => args.filter(a => a.label.trim().toLowerCase() === v.label.toLowerCase().trim()).length === 0);
    return res;
  }

}
