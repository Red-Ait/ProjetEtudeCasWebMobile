import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Store} from "@ngxs/store";
import {IUser} from "../../../@entities/IUser";
import {ITag} from "../../../@entities/ITag";
import {Register} from "../../../auth/state/auth.action";
import {AddTag, DeleteTag} from "../../state/tag.action";
import {Observable} from "rxjs";


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

  tag = {} as ITag;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [
    {label: 'Hotel', color: 'primary'},
    {label: 'Resto', color: 'primary'},
    {label: 'School', color: 'accent'},
  ];

  constructor(private store: Store) {


  }

  ngOnInit() {


  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      //this.tags=this.store.dispatch(new AddTag(this.tag));
      this.tags.push({label: value.trim(), color: 'primary'});
    }

    if (input) {
      input.value = '';
    }
  }


/*  remove(tag: Tag): void {
    if ( this.tag.id_tag>= 0) {
      this.store.dispatch(new DeleteTag( this.tag.id_tag));
    }
  }*/

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
