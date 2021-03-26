import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ITag} from '../../../@entities/ITag';


export interface Tag {
  label: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})

export class TagsComponent implements OnInit {

  constructor() {


  }
  selectedTag: ITag;

  tag = {} as ITag;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  newTagLabel = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  /* tags = [
     {label: 'Hotel', color: 'primary'},
     {label: 'Resto', color: 'primary'},
     {label: 'School', color: 'accent'},
   ];*/

  tags: ITag[] = [
    {id: 6 , label: 'Hotel'},
    {id: 7 , label: 'Resto'},
    {id: 3 , label: 'School'},
    {id: 4 , label: 'Plage'},
    {id: 5 , label: 'Ville'},
  ];

  /* add(event: MatChipInputEvent): void {
     const input = event.input;
     const value = event.value;
     if ((value || '').trim()) {
       //this.tags=this.store.dispatch(new AddTag(this.tag));
       this.tags.push({id: this.i+1label: value.trim()});
     }
     if (input) {
       input.value = '';
     }
   }*/


  /*  remove(tag: Tag): void {
      if ( this.tag.id>= 0) {
        this.store.dispatch(new DeleteTag( this.tag.id));
      }
    }*/
  edit = false;

  ngOnInit() {


  }


  addTag(): void {
    for (const tag of this.tags) {
      if (tag.label === this.newTagLabel.trim() || tag.label === '') {
        return;
      }
    }

    if ((this.newTagLabel || '').trim()) {
      this.tags.push({id: null, label: this.newTagLabel.trim()});
    }
    this.newTagLabel = '';
  }

  remove(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  select(tag: ITag): ITag {
    this.selectedTag = tag;
    return this.selectedTag;

  }

  update(tag: ITag): void{
    console.log('  this.newTagLabel');  console.log(  this.newTagLabel);
    for (const tags of this.tags) {
      if (tags.label.toLowerCase().trim() === this.newTagLabel.toLowerCase().trim()) {
        this.newTagLabel = '';
        this.selectedTag = null;
        this.edit = false;
        console.log('fail');
        return;
        // tslint:disable-next-line:triple-equals
      } else if (tags.id == tag.id) {
        console.log('ok');
        this.remove(tags);
      }
    }

    if ((this.newTagLabel || '').trim()) {
      this.tags.push({id: tag.id, label: this.newTagLabel.trim()});
    }


    this.newTagLabel = '';
    this.selectedTag = null;

  }


}
