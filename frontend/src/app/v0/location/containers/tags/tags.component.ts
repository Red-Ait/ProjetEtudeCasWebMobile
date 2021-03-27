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
  selectedTagid: number ;
  selectedTagLabel: string;
  updatedTag: string;

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

  select(tag: ITag) {
    console.log('select');
    console.log(tag);
    this.selectedTagid = tag.id;
    this.selectedTagLabel =tag.label;
    return this.selectedTagLabel;

  }

  update(): void{
    for (const tags of this.tags) {
      if (tags.label.toLowerCase().trim() === this.selectedTagLabel.toLowerCase().trim()) {
        this.selectedTagLabel = '';
        this.selectedTagid = null;
        this.edit = false;
        return;

      }

    }
    for (const tags of this.tags) {
      // tslint:disable-next-line:triple-equals
      if (tags.id == this.selectedTagid) {
        this.remove(tags);
      }
    }
    if ((this.selectedTagLabel || '').trim()) {
      console.log(this.selectedTagLabel);
      this.tags.push({id: this.selectedTagid, label: this.selectedTagLabel.trim()});
    }
    this.updatedTag = '';
    this.selectedTagid = null;
    this.selectedTagLabel = '';
/*    console.log(  'update tag');
    console.log(this.updatedTag);
    console.log(  'selected tag ');
    console.log(this.selectedTag.label);
    console.log(this.selectedTag.label.toLowerCase().trim());
    for (const tags of this.tags) {
      console.log('tags'); console.log(tags);
      // tslint:disable-next-line:triple-equals
      if (tags.label.toLowerCase().trim() == this.selectedTag.label.toLowerCase().trim()) {
          console.log(tags.label.toLowerCase().trim() ); console.log(this.selectedTag.label.toLowerCase().trim());
          console.log('what');
          this.updatedTag = '';
          this.selectedTag = null;
          this.edit = false;
          console.log('fail');
          return;

      }
      if (tags.id === tag.id) {
        console.log('what 2');
        console.log('ok');
        this.remove(tags);
      }
    }

    console.log('push');
    // this.tags.push({id: tag.id, label: this.selectedTag.label.trim()});

    this.newTagLabel = '';
    this.selectedTag = null;*/

  }


}
