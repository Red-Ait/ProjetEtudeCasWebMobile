import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import 'leaflet';
import 'leaflet-routing-machine';
import * as M from 'leaflet';
import {icon, latLng, MapOptions, Marker, tileLayer} from 'leaflet';
import {ILocation} from '../../../@entities/ILocation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'leaflet.markercluster';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {NominatimService} from '../../service/nominatim-service';

import {Select, Store} from '@ngxs/store';
import {
  DeletePosition, GetSharedWithMeLocation,
  GetUserMapPoint,
  SavePosition,
  SearchByTagsAndMode,
  SearchByTagsOrMode,
  UpdatePosition
} from '../../state/location.action';
import {LocationState} from '../../state/location.state';
import {ITag} from '../../../@entities/ITag';
import {AlertController} from '@ionic/angular';
import {SearchMode} from '../../../@entities/SearchMode';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {OsmRoutingService} from '../../service/osm-routing.service';
import {map} from 'rxjs/operators';
import {TagState} from '../../state/tag.state';
import {GetTags} from '../../state/tag.action';
import {SearchByTagMode} from '../../../@entities/SearchByTagMode';

declare let L;

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

  //  OSM Routing params
  routeInstructions = [];
  // Cluster params
  markerClusterData: M.Marker[] = [];
  markerClusterOptions: M.MarkerClusterGroupOptions;
  markerClusterGroup: M.MarkerClusterGroup;

  // Map points
  mapPoints: Array<ILocation> = new Array<ILocation>();
  sharedWithMeLocation: Array<ILocation> = new Array<ILocation>();
  selectedPoint: {
    point: ILocation,
    saved: boolean,
    onSave: boolean
  } = {
    point: {
      id: null,
      tags: [],
      label: '',
      longitude: 0,
      latitude: 0
    },
    onSave: false,
    saved: false
  };

  // Search params
  searchResults: {point: ILocation, saved: boolean}[] = [];
  searchValue = '';
  onSearch = false;
  searchByTagMode: SearchByTagMode = SearchByTagMode.OR;
  orModeSearch = SearchByTagMode.OR;
  andModeSearch = SearchByTagMode.AND;
  searchMode: SearchMode = SearchMode.searchPlace;
  currentPosition = SearchMode.currentPosition;
  searchPlace = SearchMode.searchPlace;
  advancedSearch = SearchMode.advancedSearch;
  searchedTags = new Array<ITag>();
  suggestedTags = new Array<ITag>();
  searchedTagLabel = '';

  // Save Form params
  newTagLabel = '';
  tags: ITag[] = [];

  // Selectors
  @Select(LocationState.menuToggle) $menuToggle;
  @Select(LocationState.getMapPoints) $mapPoints;
  @Select(LocationState.getSharedWithMeLocations) $sharedWithMeLocations;
  @Select(TagState.getTags) $getTags;
  @Select(LocationState.getPointsSearchedByTags) $pointsSearchedByTags;

  // View Child
  @ViewChild('positionDetail') positionDetail;
  @ViewChild('sharedPositionDetail') sharedPositionDetail;
  @ViewChild('positionDetailExtended') positionDetailExtended;
  @ViewChild('searchbar') searchBar;
  @ViewChild('routeDetail') routeDetail;

  constructor(private modalService: NgbModal,
              private routingService: OsmRoutingService,
              private geolocation: Geolocation,
              private store: Store,
              public alertController: AlertController,
              private nominatimService: NominatimService
              ) { }

  ngOnInit() {
    this.initializeMapOptions();
    this.store.dispatch([new GetUserMapPoint(), new GetSharedWithMeLocation(), new GetTags()]);
    this.$mapPoints.subscribe(data => {
      this.mapPoints = data;
      if (this.mapPoints.length > 0) {
        this.map.panTo(latLng(this.mapPoints[0].latitude, this.mapPoints[0].longitude));
      }
      this.markerClusterData = this.setMarkers();
      if (this.selectedPoint !== null) {
        if (this.selectedPoint.onSave) {
          this.selectedPoint.saved = true;
          this.selectedPoint.onSave = false;
          this.removeUnknownMarker();
        }
      }
    });
    this.$getTags.subscribe(t => {
      this.tags = t;
    });
    this.$pointsSearchedByTags.subscribe(data => {
      this.searchResults = [];
      const aux = data.map(d => ({point: d, saved: true}));
      this.searchResults = [ ...aux];
      });
    this.$sharedWithMeLocations.subscribe(data => {
      this.sharedWithMeLocation = data;
      this.markerClusterData = this.setMarkers();
    });
    this.$menuToggle.subscribe(t => {
      if (t) {
        this.modalService.dismissAll();
      }
    });
  }

  removeTag(tag: ITag): void {
    const index = this.selectedPoint.point.tags.indexOf(tag);

    if (index >= 0) {
      this.selectedPoint.point.tags.splice(index, 1);
    }
  }
  removeSearchedTag(tag: ITag): void {
    const index = this.searchedTags.indexOf(tag);

    if (index >= 0) {
        this.searchedTags.splice(index, 1);
        this.searchByTag();
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
  addSearchTag(tag: ITag) {
    this.searchedTags.push(tag);
    const index = this.suggestedTags.indexOf(tag);

    if (index >= 0) {
      this.suggestedTags.splice(index, 1);
    }
    this.searchByTag();
  }
  searchByTag() {
    this.searchResults = [];
    if (this.searchedTags.length === 0) {
      return;
    }
    if (this.searchByTagMode === this.orModeSearch) {
      this.store.dispatch(new SearchByTagsOrMode(this.searchedTags));
    }
    if (this.searchByTagMode === this.andModeSearch) {
      this.store.dispatch(new SearchByTagsAndMode(this.searchedTags));
    }
  }
  addTag(): void {
    if (this.newTagLabel === '') {
      return;
    }

    for (const tag of this.selectedPoint.point.tags) {
      if (tag.label === this.newTagLabel.trim() ||  tag.label === '') {
        return;
      }
    }

    for (const tag of this.tags) {
      if (tag.label.trim().toLowerCase() === this.newTagLabel.trim().toLowerCase() ||  tag.label === '') {
        this.selectedPoint.point.tags.push(tag);
        this.newTagLabel = '';
      }
    }
    if (this.newTagLabel !== '') {
      this.selectedPoint.point.tags.push({id: null, label: this.newTagLabel});
      this.newTagLabel = '';
    }
  }
  saveNewPosition() {
    this.addTag();
    if (this.selectedPoint.point.tags.length > 0) {
      this.store.dispatch(new SavePosition(this.selectedPoint.point));
    }
  }

  updatePosition() {
    this.addTag();
    if (this.selectedPoint.point.tags.length > 0) {
      this.store.dispatch(new UpdatePosition(this.selectedPoint.point));
    }
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
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Etude des cas Web et Mobile'
          })
      ],
    };
  }

  markerClusterReady(group: M.MarkerClusterGroup){
    this.markerClusterGroup = group;
    this.markerClusterGroup.on('clusterclick', () => {
      this.onSearch = false;
    });
  }

  onMapReady(m: any) {
    this.map = m;
    this.map.addControl(M.control.zoom({ position: 'bottomright' }));
    setTimeout(() => {
      this.map.invalidateSize();
    }, 2110);
    this.markerClusterData = this.setMarkers();
  }

  createMarker(p: ILocation, shared: boolean): Marker{
    // tslint:disable-next-line:no-shadowed-variable
    const icon = M.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: shared ? 'assets/red-marker.png' : 'assets/marker-icon.png'
    });

    const marker: Marker = M.marker([ p.latitude, p.longitude], { icon });
    marker.on('click', () => {this.onClickOnMarker(p, shared); });

    return marker;
  }

  private setMarkers() {
    const data: Marker[] = [];

    this.mapPoints.forEach(p => {
      data.push(this.createMarker(p, false));
    });
    this.sharedWithMeLocation.forEach(p => {
      p.id = null;
      p.tags = p.tags.map(t => ({...t, id: null}));
      data.push(this.createMarker(p, true));
    });
    return data;
  }

  onClickOnMarker(pt: ILocation, shared: boolean) {
    this.selectedPoint = {
      point: pt,
      saved: !shared,
      onSave: false
    };
    this.modalService.dismissAll();
    this.unselectPoint();
    this.openModal(shared ? this.sharedPositionDetail : this.positionDetail, false);
    this.onSearch = false;
  }
  selectResult(result: { point: ILocation, saved: boolean }) {
    if (!result.saved) {
      this.showNewMarker(result.point.latitude, result.point.longitude, result.point.label, result.saved);
    }
    this.searchValue = result.point.label;
    this.searchResults = [];
    this.map.setZoom(15);
    this.map.flyTo(latLng(result.point.latitude, result.point.longitude));
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
        id: null,
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
    this.removeUnknownMarker();
  }
  removeUnknownMarker() {
    if (this.map.hasLayer(this.lastSelectedLayer)){
      this.map.removeLayer(this.lastSelectedLayer);
    }
  }
  addressLookup(address: string) {
    this.searchResults = [];
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        const aux: Array<{point: ILocation, saved: boolean}> = results.map(r => ({
          point: {
            id: 0,
            label: r.displayName,
            longitude: r.longitude,
            latitude: r.latitude,
            tags: []
          },
          saved: false
        }));
        this.searchResults = [...this.searchResults, ...aux];
      });
      this.store.select(LocationState.searchPositionByName)
        .pipe(map(query => query(address))).subscribe(data => {
          console.log(address, data);
          if (this.searchMode === this.searchPlace) {
            const aux = data.map(d => ({point: d, saved: true}));
            this.searchResults = [...this.searchResults, ...aux];
          }
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
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: ' ',
        subHeader: 'Error getting location',
        buttons: ['OK']
      });
      await alert.present();
    });


  }

  onChangeSearchByTagInput() {
    this.suggestedTags = new Array<ITag>();
    for (const tag of this.tags) {
      if (tag.label.trim().toLowerCase().includes( this.searchedTagLabel.toLowerCase().trim())) {
        let exist = false;
        for (const exTag of this.searchedTags) {
          if (tag.label.trim().toLowerCase() === exTag.label.trim().toLowerCase()) {
            exist = true;
          }
        }
        if (!exist) {
          this.suggestedTags.push(tag);
        }
      }
    }
  }
  changeJoinMode() {
    this.searchByTag();
  }
  searchFocus() {
    this.onSearch = true;
    this.searchMode = this.searchPlace;
    setTimeout(() => {
      if (this.searchBar !== undefined) {
        this.searchBar.setFocus();
      }
    },  822);
    this.modalService.dismissAll();
  }
  getDirection() {
    return;
    this.geolocation.getCurrentPosition().then((resp) => {
      if (this.map.hasLayer(this.lastSelectedLayer)) {
        this.map.removeLayer(this.lastSelectedLayer);
      }
      const myRouting = L.Routing.control({
        waypoints: [
          M.latLng(resp.coords.latitude, resp.coords.longitude),
          M.latLng(this.selectedPoint.point.latitude, this.selectedPoint.point.longitude),
        ],
        router: new L.Routing.OSRMv1({
          serviceUrl: 'http://router.project-osrm.org/route/v1'
        }),
        icon: M.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png'
        }),
        createMarker: (i, start, n) => {
          // tslint:disable-next-line:variable-name
          let marker_icon = null;
          if (i === 0) {
            marker_icon = icon({
              iconSize: [40, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/green-marker.png'
            });
          } else if (i === n - 1) {
            marker_icon = icon({
              iconSize: [40, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/red-marker.png'
            });

          }
          const marker = L.marker(start.latLng, {
            draggable: true,
            bounceOnAdd: false,
            bounceOnAddOptions: {
              duration: 1000,
              height: 800,
            },
            icon: marker_icon
          });
          return marker;
        },
        lineOptions: {
          styles: [{ color: 'green', opacity: 1, weight: 5 }]
        },
      }).addTo(this.map);
      myRouting.on('routesfound', (e) => {
        this.routeInstructions = e.routes[0].instructions.map(i => {
          i.type = this.routingService.getIconClass(i.type);
          return i;
        });
        this.modalService.dismissAll();
        this.openModal(this.routeDetail, false);
      });
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: ' ',
        subHeader: 'Error getting location',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
  nextSlide(slides) {
    slides.slideNext();
  }
  previousSlide(slides) {
    slides.slidePrev();
  }
}
