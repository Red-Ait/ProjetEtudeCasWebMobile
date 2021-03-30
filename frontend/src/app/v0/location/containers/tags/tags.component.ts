import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ITag} from '../../../@entities/ITag';
import {
  AddTag,
  DeleteTag, DeleteTagSuccess,
  GetTags,
  GetUserNames,
  ShareLocationsWithAnotherUserByTagTitles,
  UpdateTag
} from '../../state/tag.action';
import {Select, Store} from '@ngxs/store';
import {TagState} from '../../state/tag.state';
import {DeletePosition} from '../../state/location.action';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertController, PopoverController} from '@ionic/angular';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TagService} from '../../service/tag.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})

export class TagsComponent implements OnInit, OnDestroy {
  private locations: ArrayBuffer;


  constructor(private store: Store, private modalService: NgbModal, public alertController: AlertController,
              public popoverController: PopoverController, public dialog: MatDialog, public service: TagService) {


  }

  selectedTagid: number;
  selectedTagLabel: string;
  updatedTag: string;
  deletedTag: ITag;
  users: any;
  tagsSelected: string[] = [];
  used: '';
  private result: any;


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
  @ViewChild('list') list;
  @ViewChild('shareTag') shareTag;
  private destroy$ = new Subject();
  /*openDialog(): void {
    const dialogRef = this.dialog.open(ListComponent, {
      width: '250px',
      data: 'okay'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }*/
  selectedUser: string;


  ngOnInit() {
    this.store.dispatch(new GetTags());
    this.$tags.subscribe(data => {
      this.tags = data;
    });
    this.service.getUserNames().pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
    });

  }


  async addTag() {

    for (const tag of this.tags) {
      if (tag.label === this.newTagLabel.trim() || tag.label === '') {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '  ',
          subHeader: ' this tag already exists !',
          message: '',
          buttons : [
            {
              text: 'Close',
              role: 'cancel',
              handler: () => {
              }}
          ]

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
        message: 'tag created  !',
        buttons : [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
            }}
        ]
      });
      await alert.present();
    }
    this.newTagLabel = '';
  }
  async remove() {
    this.modalService.dismissAll();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      subHeader: 'Are you sure ?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            this.store.dispatch(new DeleteTag(this.deletedTag.id)).pipe(takeUntil(this.destroy$)).subscribe(result => {
              this.result = result.tagState.deleteResult;
              console.log(this.result);
            });
            switch (this.result) {
              case  true:
                const alert5 = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: ' Great ',
                  subHeader: ' ',
                  message: 'tag deleted !',
                  buttons: [
                    {
                      text: 'Close',
                      role: 'cancel',
                      handler: () => {
                      }
                    }
                  ]
                });
                await alert5.present();
                break;
              case  false:
                if (this.deletedTag.label === ' defaultTag') {
                  const alert4 = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: ' You cannot delete this tag ! ',
                    subHeader: ' ',
                    message: '',
                    buttons: [
                      {
                        text: 'Close',
                        role: 'cancel',
                        handler: () => {
                        }
                      }
                    ]
                  });
                  await alert4.present();
                } else {
                  const alert7 = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: ' tag not found  ! ',
                    subHeader: ' ',
                    message: '',
                    buttons: [
                      {
                        text: 'Close',
                        role: 'cancel',
                        handler: () => {
                        }
                      }
                    ]
                  });
                  await alert7.present();
                }
                break;
            }
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

  /*
    select(tag: ITag) {
      this.selectedTagid = tag.id;
      this.selectedTagLabel = tag.label;
      console.log(this.selectedTagLabel);
      return this.selectedTagLabel;
    }
  */

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
          message: 'this tag already exists !',
          buttons : [
            {
              text: 'Close',
              role: 'cancel',
              handler: () => {
              }}
          ]
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
        message: 'tag updated !',
        buttons : [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
            }}
        ]
      });
      await alert.present();
    }
    this.updatedTag = '';
    this.selectedTagid = null;
    this.selectedTagLabel = '';

  }

  openModal(template: any, extended: boolean) {
    this.modalService.open(template, {
      size: 'sm',
      windowClass: extended ? 'extended-modal-class' : 'short-modal-class',
      backdropClass: 'backdrop-class'
    });
  }
  open(tag: ITag) {
    this.selectedTagid = tag.id;
    this.selectedTagLabel = tag.label;
    this.deletedTag = tag;
    this.openModal(this.list, false);
  }


  share() {
    this.openModal(this.shareTag, false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }

  add(): void {
    if (this.used === '') {
      return;
    }

    for (const tag of this.tags) {
      if (tag.label.trim().toLowerCase() === this.used.trim().toLowerCase() ||  tag.label === '') {
        this.tagsSelected.push(tag.label.trim());
        this.used = '';
      }
    }
    if (this.used !== '') {
      this.tagsSelected.push(this.used);
      this.used = '';
    }
  }

  async ShareTag() {
    if (this.selectedUser === undefined) {
      const alert2 = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '  You should select username  ',
        subHeader: ' ',
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      await alert2.present();
      return;
    }
    this.tagsSelected.push(this.selectedTagLabel);
    console.log(this.selectedUser);
    this.service.shareLocationsWithAnotherUserByTagTitles(this.selectedUser, this.tagsSelected);
    // this.store.dispatch(new ShareLocationsWithAnotherUserByTagTitles(this.selectedUser, this.tagsSelected))
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '  Great  ',
      subHeader: ' ',
      message: 'tag shared!',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
    this.tagsSelected = [];
    this.selectedUser = null;
  }

}
