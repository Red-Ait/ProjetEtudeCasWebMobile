import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-location',
  templateUrl: './main-location.component.html',
  styleUrls: ['./main-location.component.scss'],
})
export class MainLocationComponent implements OnInit {

  public appPages = [
    { title: 'Me', url: '/folder/Inbox', icon: 'person' },
    { title: 'Maps', url: '/location/map', icon: 'map' },
    { title: 'Tags', url: '/location/tags', icon: 'pricetags' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Shared', url: '/folder/Trash', icon: 'share-social' },
    { title: 'Setting', url: '/folder/Spam', icon: 'settings' },
    { title: 'Log out', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = ['Home', 'Work', 'Snacks'];

  constructor() { }

  ngOnInit() {
  }

}
