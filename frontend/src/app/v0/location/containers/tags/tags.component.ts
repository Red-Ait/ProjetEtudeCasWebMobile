import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Store} from "@ngxs/store";
import {AppState} from "@capacitor/core";
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {label: 'Hotel', color: 'primary'},
    {label: 'Resto', color: 'primary'},
    {label: 'School', color: 'accent'},
  ];

  constructor(private store: Store) {
    //this.tags = this.store.select(state => state.tags);
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({label: value.trim(), color: 'primary'});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
