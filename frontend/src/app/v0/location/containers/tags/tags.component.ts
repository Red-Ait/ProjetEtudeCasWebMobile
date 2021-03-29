import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ITag} from '../../../@entities/ITag';
import {AddTag, DeleteTag, GetTags, UpdateTag} from '../../state/tag.action';
import {Select, Store} from '@ngxs/store';
import {TagState} from '../../state/tag.state';
import {DeletePosition} from '../../state/location.action';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertController} from '@ionic/angular';


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

  constructor(private store: Store, private modalService: NgbModal, public alertController: AlertController) {


  }

  selectedTagid: number;
  selectedTagLabel: string;
  updatedTag: string;


  tag = {} as ITag;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  newTagLabel = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: ITag[];


  edit = false;

  // Selectors
  @Select(TagState.getTags) $tags;


  ngOnInit() {
    this.store.dispatch(new GetTags());
    this.$tags.subscribe(data => {
      this.tags = data;
    });


  }


  async addTag() {

    for (const tag of this.tags) {
      if (tag.label === this.newTagLabel.trim() || tag.label === '') {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '  Alert ! ',
          subHeader: ' ',
          message: 'this tag already exists !'
        });
        await alert.present();
        return;
      }
    }

    if ((this.newTagLabel || '').trim()) {
      this.store.dispatch(new AddTag({id: null, label: this.newTagLabel.trim()}));
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: ' Great ',
        subHeader: ' ',
        message: 'tag created  !'
      });
      await alert.present();
    }
    this.newTagLabel = '';
  }
  async remove(tag: ITag) {
    this.modalService.dismissAll();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      subHeader: 'Are you sure ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
                this.store.dispatch(new DeleteTag(tag.id));
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await alert.present();
  }


  select(tag: ITag) {
    this.selectedTagid = tag.id;
    this.selectedTagLabel = tag.label;
    return this.selectedTagLabel;

  }

  async update() {
    for (const tags of this.tags) {
      if (tags.label.toLowerCase().trim() === this.selectedTagLabel.toLowerCase().trim()) {
        this.selectedTagLabel = '';
        this.selectedTagid = null;
        this.edit = false;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '  Alert ! ',
          subHeader: ' ',
          message: 'this tag already exists !'
        });
        await alert.present();
        return;

      }
    }
    if ((this.selectedTagLabel || '').trim()) {

      this.store.dispatch(new UpdateTag(this.selectedTagid, {
        id: this.selectedTagid,
        label: this.selectedTagLabel.trim()
      }));
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '  Great  ',
        subHeader: ' ',
        message: 'tag updated !'
      });
      await alert.present();
    }
    this.updatedTag = '';
    this.selectedTagid = null;
    this.selectedTagLabel = '';

  }



}
