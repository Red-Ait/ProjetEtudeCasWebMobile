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
<<<<<<< HEAD
import {Select, Store} from '@ngxs/store';
import {GetUserMapPoint} from '../../state/location.action';
import {LocationState} from '../../state/location.state';
=======
>>>>>>> f6b580abe5abe374c5c9f9d5f2a4c936d2dfa6f5

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
    saved: boolean
  } = null;

  // Search params
  searchResults: NominatimResponse[] = [];
  searchValue = '';

  // Selectors
  @Select(LocationState.getMapPoints) $mapPoints;

  // View Child
  @ViewChild('positionDetail') positionDetail;

  constructor(private modalService: NgbModal,
              private store: Store,
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

  openModal(template: any) {
    this.modalService.open(template, {
      size: 'sm',
      windowClass: 'modal-class',
      backdropClass: 'backdrop-class'
    });
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
      const icon = L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png'
      });

      let marker: Marker = L.marker([ p.latitude, p.longitude], { icon });
      marker.on('click', () => {this.onClickOnMarker(p); });
      data.push(marker);
    });
    return data;

  }

  onClickOnMarker(pt: IMapPoint) {
    this.selectedPoint = {
      point: pt,
      saved: true
    };
    this.modalService.dismissAll();
    this.unselectPoint();
    this.openModal(this.positionDetail);

  }
  selectReselt(result: NominatimResponse) {
    this.showNewMarker(result.latitude, result.longitude, result.displayName, false);
    this.searchValue = result.displayName;
    this.searchResults = [];
    this.map.setZoom(15);
    this.map.flyTo(latLng(result.latitude, result.longitude));
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
      saved
  };
    this.openModal(this.positionDetail);
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

}
