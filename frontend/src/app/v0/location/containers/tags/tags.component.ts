import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Store} from "@ngxs/store";
import {IUser} from "../../../@entities/IUser";
import {ITag} from "../../../@entities/ITag";


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

  selectedTag: ITag;

  tag = {} as ITag;
  i : number = 6;
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
    {id: 6 ,label: 'Hotel'},
    {id: 7 ,label: 'Resto'},
    {id: 3 ,label: 'School'},
    {id: 4 ,label: 'Plage'},
    {id: 5 ,label: 'Ville'},
  ];

  constructor(private store: Store) {


  }

  ngOnInit() {


  }


  addTag(): void {
    for (const tag of this.tags) {
      if (tag.label === this.newTagLabel.trim() || tag.label === '') {
        return;
      }
    }

    if ((this.newTagLabel || '').trim()) {
      this.tags.push({id:null,label: this.newTagLabel.trim()});
    }
    this.newTagLabel = '';
  }

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
  edit: boolean=false;

  remove(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  select(tag: ITag): ITag {
    this.selectedTag=tag;
   return this.selectedTag;

  }

  update(tag:ITag):void{
    for (const tags of this.tags) {
      if (tags.id == tag.id) {
        this.remove(tags);
      }
    }
    if ((this.newTagLabel || '').trim()) {
      console.log(this.newTagLabel);
      this.tags.push({id:tag.id,label: this.newTagLabel.trim()});
    }
    this.newTagLabel = '';
    this.selectedTag=null;

  }


}
