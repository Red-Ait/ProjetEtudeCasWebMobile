import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as L from 'leaflet';
import {control, icon, latLng, MapOptions, Marker, tileLayer} from 'leaflet';
import {IMapPoint} from '../../../@entities/IMapPoint';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'leaflet.markercluster';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import {NominatimService} from '../../service/nominatim-service';
import {NominatimResponse} from '../../models/nominatim-response.model';

import {Select, Store} from '@ngxs/store';
import {DeletePosition, GetUserMapPoint, SavePosition, UpdatePosition} from '../../state/location.action';
import {LocationState} from '../../state/location.state';
import {ITag} from '../../../@entities/ITag';
import {AlertController} from '@ionic/angular';
import {SearchMode} from '../../../@entities/SearchMode';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  // Map params
  mapOptions: MapOptions;
  map: any;
  lastSelectedLayer: any;

  // Cluster params
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;

  // Map points
  mapPoints: Array<IMapPoint> = new Array<IMapPoint>();
  selectedPoint: {
    point: IMapPoint,
    saved: boolean,
    onSave: boolean
  } = null;

  // Search params
  searchResults: NominatimResponse[] = [];
  searchValue = '';
  onSearch = false;
  searchMode: SearchMode = SearchMode.searchPlace;
  currentPosition = SearchMode.currentPosition;
  searchPlace = SearchMode.searchPlace;

  // Save Form params
  newTagLabel = '';
  tags: ITag[] = [
    {label: 'Hotel'},
    {label: 'Resto'},
    {label: 'School'},
    {label: 'Plage'},
    {label: 'Ville'},
  ];

  // Selectors
  @Select(LocationState.getMapPoints) $mapPoints;

  // View Child
  @ViewChild('positionDetail') positionDetail;
  @ViewChild('positionDetailExtended') positionDetailExtended;

  constructor(private modalService: NgbModal,
              private geolocation: Geolocation,
              private store: Store,
              public alertController: AlertController,
              private nominatimService: NominatimService
              ) { }

  ngOnInit() {
    this.initializeMapOptions();
    this.store.dispatch(new GetUserMapPoint());
    this.$mapPoints.subscribe(data => {
      this.mapPoints = data;
      this.markerClusterData = this.setMarkers();
    });
  }

  removeTag(tag: ITag): void {
    const index = this.selectedPoint.point.tags.indexOf(tag);

    if (index >= 0) {
      this.selectedPoint.point.tags.splice(index, 1);
    }
  }
  async deleteConfirmAlert() {
    this.modalService.dismissAll();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      subHeader: 'Are you sure ?',
      buttons: [
        {
        text: 'Yes',
        handler: () => {
          this.store.dispatch(new DeletePosition(this.selectedPoint.point));
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

  addTag(): void {
    for (const tag of this.selectedPoint.point.tags) {
      if (tag.label === this.newTagLabel.trim() ||  tag.label === '') {
        return;
      }
    }

    if ((this.newTagLabel || '').trim()) {
      this.selectedPoint.point.tags.push({label: this.newTagLabel.trim()});
    }
    this.newTagLabel = '';
  }
  saveNewPosition() {
    this.addTag();
    this.store.dispatch(new SavePosition(this.selectedPoint.point));
  }

  updatePosition() {
    this.addTag();
    this.store.dispatch(new UpdatePosition(this.selectedPoint.point));
  }
  openModal(template: any, extended: boolean) {
    this.modalService.open(template, {
      size: 'sm',
      windowClass: extended ? 'extended-modal-class' : 'short-modal-class',
      backdropClass: 'backdrop-class'
    });
   }
  extendPositionDetal(extend: boolean) {
    this.modalService.dismissAll();
    if (extend) {
      this.openModal(this.positionDetailExtended, true);
    } else {
      this.openModal(this.positionDetail, false);
    }
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(48.856614, 2.3522219),
      zoom: 6,
      zoomControl: false,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Etude des cas Web et Mobile'
          })
      ],
    };
  }

  markerClusterReady(group: L.MarkerClusterGroup){
    this.markerClusterGroup = group;
    this.markerClusterGroup.on('clusterclick', () => {
      this.onSearch = false;
    });
  }

  onMapReady(map: any) {

    setTimeout(() => {
      map.invalidateSize();
    }, 2110);
    this.map = map;
    this.map.addControl(control.zoom({ position: 'bottomright' }));
    this.markerClusterData = this.setMarkers();
  }

  private setMarkers() {
    const data: Marker[] = [];

    this.mapPoints.forEach(p => {
      // tslint:disable-next-line:no-shadowed-variable
      const icon = L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png'
      });

      const marker: Marker = L.marker([ p.latitude, p.longitude], { icon });
      marker.on('click', () => {this.onClickOnMarker(p); });
      data.push(marker);
    });
    return data;

  }

  onClickOnMarker(pt: IMapPoint) {
    this.selectedPoint = {
      point: pt,
      saved: true,
      onSave: false
    };
    this.modalService.dismissAll();
    this.unselectPoint();
    this.openModal(this.positionDetail, false);
    this.onSearch = false;
  }
  selectReselt(result: NominatimResponse) {
    this.showNewMarker(result.latitude, result.longitude, result.displayName, false);
    this.searchValue = result.displayName;
    this.searchResults = [];
    this.map.setZoom(15);
    this.map.flyTo(latLng(result.latitude, result.longitude));
    this.onSearch = false;
  }
  showNewMarker(lat, lng, label, saved) {

    this.modalService.dismissAll();
    this.unselectPoint();

    const marker = new Marker([lat, lng])
      .setIcon(
        icon({
          iconSize: [40, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/unk-marker.png'
        }));
    this.lastSelectedLayer = marker.addTo(this.map);

    this.selectedPoint = {
      point: {
        label,
        latitude: lat,
        longitude: lng,
        tags: []
      },
      saved,
      onSave: false
    };
    this.openModal(this.positionDetail, false);
    this.onSearch = false;
  }

  private unselectPoint() {

    this.modalService.dismissAll();
    if (this.map.hasLayer(this.lastSelectedLayer)){
      this.map.removeLayer(this.lastSelectedLayer);
//      this.selectedPoint = null;
    }
  }
  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  switchSearchMod() {
    if (this.searchMode === this.currentPosition) {
      this.currentLocationLookup();
    }
  }
  currentLocationLookup() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.showNewMarker(resp.coords.latitude, resp.coords.longitude, 'Current Position', false);
      this.map.setZoom(15);
      this.map.flyTo(latLng(resp.coords.latitude, resp.coords.longitude));
      this.onSearch = false;
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }
}
