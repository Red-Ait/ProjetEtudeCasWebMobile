import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {control, icon, latLng, MapOptions, Marker, tileLayer} from 'leaflet';
import {IMapPoint} from '../../../@entities/IMapPoint';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ITag} from '../../../@entities/ITag';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  map: any;
  center: IMapPoint = {label: 'ISIMA', latitude: 45.75890569083574, longitude: 3.1111511974960324, tags: [{label: 'UCA'}]};
  mapPoints: Array<IMapPoint> = [
    {label: 'LIMOS', latitude: 45.76631844659534, longitude: 3.1004569123615515, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]}
  ];
  lastSelectedLayer: any;
  selectedPoint: IMapPoint = null;

  @ViewChild('newPositionDetail') newPositionDetail;
  @ViewChild('positionDetail') positionDetail;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.initializeMapOptions();
  }

  openModal(template: any) {
    this.modalService.open(template, {
      size: 'sm',
      windowClass: 'modal-class',
      backdropClass: 'backdrop-class'
    });
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(this.center.latitude, this.center.longitude),
      zoom: 12,
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

  onMapReady(map: any) {

    setTimeout(() => {
      map.invalidateSize();
    }, 2110);
    this.map = map;
    this.map.addControl(control.zoom({ position: 'bottomright' }));
    this.setMarkers(this.center, this.mapPoints);
  }

  private setMarkers(centerPosition: IMapPoint, points: Array<IMapPoint>) {
    const centerMarker = new Marker([centerPosition.latitude, centerPosition.longitude])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    centerMarker.addTo(this.map);
    centerMarker.on('click', () => {this.onClickOnMarker(centerPosition); });
    points.forEach(p => {
      const marker = new Marker([p.latitude, p.longitude])
        .setIcon(
          icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png'
          }));
      marker.addTo(this.map);
      marker.on('click', () => {this.onClickOnMarker(p); });
    });
  }

  onClickOnMarker(pt: IMapPoint) {
    this.selectedPoint = pt;
    this.modalService.dismissAll();
    this.openModal(this.positionDetail);
    console.log(pt);
  }
  onMapClick($event) {
    console.log($event);
    this.modalService.dismissAll();
    this.unselectPoint();

    const marker = new Marker([$event.latlng.lat, $event.latlng.lng])
      .setIcon(
        icon({
          iconSize: [40, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/unk-marker.png'
        }));
    this.lastSelectedLayer = marker.addTo(this.map);
    console.log('selected : ', this.lastSelectedLayer);
    this.selectedPoint = {
      label: 'New Selection',
      latitude: $event.latlng.lat,
      longitude: $event.latlng.lng,
      tags: []
    };
    this.openModal(this.newPositionDetail);
  }

  private unselectPoint() {
    if (this.map.hasLayer(this.lastSelectedLayer)){
      this.map.removeLayer(this.lastSelectedLayer);
      this.selectedPoint = null;
    }
    console.log('removed : ', this.lastSelectedLayer);
    this.modalService.dismissAll();
  }
}
