import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {control, icon, latLng, MapOptions, Marker, tileLayer} from 'leaflet';
import {IMapPoint} from '../../../@entities/IMapPoint';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import {NominatimService} from '../../service/nominatim-service';
import {NominatimResponse} from "../../models/nominatim-response.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;
  map: any;
  center: IMapPoint = {label: 'ISIMA', latitude: 45.75890569083574, longitude: 3.1111511974960324, tags: [{label: 'UCA'}]};
  mapPoints: Array<IMapPoint> = [
    {label: 'LIMOS', latitude: 45.76631844659534, longitude: 3.1004569123615515, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Paris', latitude: 48.8566, longitude: 2.3522, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nice', latitude: 43.7034, longitude: 7.2663, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Toulouse', latitude: 43.6045, longitude: 1.4440, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Marseille', latitude: 43.2964, longitude: 5.3700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rennes', latitude: 48.1147, longitude: -1.6794, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Grenoble', latitude: 45.1715, longitude: 5.7224, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nantes', latitude: 47.2181, longitude: -1.5528, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montpellier', latitude: 43.6119, longitude: 3.8772, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lyon', latitude: 45.7600, longitude: 4.8400, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rouen', latitude: 49.4428, longitude: 1.0886, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Strasbourg', latitude: 48.5833, longitude: 7.7458, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nancy', latitude: 48.6936, longitude: 6.1846, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Metz', latitude: 49.1203, longitude: 6.1778, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Brest', latitude: 48.3900, longitude: -4.4900, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mulhouse', latitude: 47.7500, longitude: 7.3400, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Limoges', latitude: 45.8353, longitude: 1.2625, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Orléans', latitude: 47.9025, longitude: 1.9090, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bordeaux', latitude: 44.8400, longitude: -0.5800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Havre', latitude: 49.4900, longitude: 0.1000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lille', latitude: 50.6278, longitude: 3.0583, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Reims', latitude: 49.2628, longitude: 4.0347, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Étienne', latitude: 45.4347, longitude: 4.3903, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Toulon', latitude: 43.1258, longitude: 5.9306, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dijon', latitude: 47.3167, longitude: 5.0167, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Angers', latitude: 47.4736, longitude: -0.5542, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nîmes', latitude: 43.8380, longitude: 4.3610, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villeurbanne', latitude: 45.7667, longitude: 4.8803, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Clermont-Ferrand', latitude: 45.7831, longitude: 3.0824, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Mans', latitude: 48.0077, longitude: 0.1984, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aix-en-Provence', latitude: 43.5263, longitude: 5.4454, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Amiens', latitude: 49.8920, longitude: 2.2990, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Tours', latitude: 47.2436, longitude: 0.6892, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Boulogne-sur-Mer', latitude: 50.7264, longitude: 1.6147, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Annecy', latitude: 45.9160, longitude: 6.1330, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Perpignan', latitude: 42.6986, longitude: 2.8956, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Boulogne-Billancourt', latitude: 48.8352, longitude: 2.2409, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Besançon', latitude: 47.2400, longitude: 6.0200, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Belfort', latitude: 47.6400, longitude: 6.8500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Denis', latitude: 48.9356, longitude: 2.3539, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Argenteuil', latitude: 48.9500, longitude: 2.2500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montreuil', latitude: 48.8611, longitude: 2.4436, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Caen', latitude: 49.1800, longitude: -0.3700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Roubaix', latitude: 50.6901, longitude: 3.1817, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Tourcoing', latitude: 50.7239, longitude: 3.1612, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nanterre', latitude: 48.8988, longitude: 2.1969, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Avignon', latitude: 43.9500, longitude: 4.8075, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vitry-sur-Seine', latitude: 48.7875, longitude: 2.3928, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Épinal', latitude: 48.1744, longitude: 6.4512, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Créteil', latitude: 48.7911, longitude: 2.4628, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Poitiers', latitude: 46.5800, longitude: 0.3400, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dunkerque', latitude: 51.0383, longitude: 2.3775, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aubervilliers', latitude: 48.9131, longitude: 2.3831, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Versailles', latitude: 48.8053, longitude: 2.1350, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aulnay-sous-Bois', latitude: 48.9386, longitude: 2.4906, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Carrières-sur-Seine', latitude: 48.9108, longitude: 2.2889, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Colombes', latitude: 48.9236, longitude: 2.2522, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Courbevoic', latitude: 48.8978, longitude: 2.2531, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rueil-Malmaison', latitude: 48.8760, longitude: 2.1810, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Champigny-sur-Marne', latitude: 48.8172, longitude: 2.5156, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Béziers', latitude: 43.3476, longitude: 3.2190, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pau', latitude: 43.3000, longitude: -0.3700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Rochelle', latitude: 46.1591, longitude: -1.1517, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Maur-des-Fossés', latitude: 48.7994, longitude: 2.4997, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Calais', latitude: 50.9481, longitude: 1.8564, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cannes', latitude: 43.5513, longitude: 7.0128, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Antibes', latitude: 43.5808, longitude: 7.1239, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Drancy', latitude: 48.9300, longitude: 2.4500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Ajaccio', latitude: 41.9267, longitude: 8.7369, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mérignac', latitude: 44.8386, longitude: -0.6436, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Nazaire', latitude: 47.2806, longitude: -2.2086, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Colmar', latitude: 48.0817, longitude: 7.3556, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Issy-les-Moulineaux', latitude: 48.8239, longitude: 2.2700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Noisy-le-Grand', latitude: 48.8478, longitude: 2.5528, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Courcouronnes', latitude: 48.6239, longitude: 2.4294, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vénissieux', latitude: 45.6978, longitude: 4.8867, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cergy', latitude: 49.0361, longitude: 2.0631, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bourges', latitude: 47.0844, longitude: 2.3964, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Levallois-Perret', latitude: 48.8950, longitude: 2.2872, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Seyne-sur-Mer', latitude: 43.1000, longitude: 5.8830, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pessac', latitude: 44.8067, longitude: -0.6311, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Valence', latitude: 44.9333, longitude: 4.8917, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Quimper', latitude: 47.9967, longitude: -4.0964, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Antony', latitude: 48.7539, longitude: 2.2975, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Ivry-sur-Seine', latitude: 48.8078, longitude: 2.3747, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montélimar', latitude: 44.5581, longitude: 4.7508, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Troyes', latitude: 48.2997, longitude: 4.0792, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Clichy', latitude: 48.9044, longitude: 2.3064, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cherbourg', latitude: 49.6504, longitude: -1.6500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montauban', latitude: 44.0181, longitude: 1.3558, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Neuilly-sur-Seine', latitude: 48.8881, longitude: 2.2686, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chambéry', latitude: 45.5700, longitude: 5.9118, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Niort', latitude: 46.3258, longitude: -0.4606, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sarcelles', latitude: 48.9956, longitude: 2.3808, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pantin', latitude: 48.8966, longitude: 2.4017, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lorient', latitude: 47.7500, longitude: -3.3600, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Blanc-Mesnil', latitude: 48.9387, longitude: 2.4614, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Beauvais', latitude: 49.4303, longitude: 2.0952, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Maisons-Alfort', latitude: 48.8058, longitude: 2.4378, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Hyères', latitude: 43.1199, longitude: 6.1316, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Épinay-sur-Seine', latitude: 48.9553, longitude: 2.3092, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Meaux', latitude: 48.9603, longitude: 2.8883, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chelles', latitude: 48.8833, longitude: 2.6000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villejuif', latitude: 48.7919, longitude: 2.3636, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Narbonne', latitude: 43.1836, longitude: 3.0042, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Roche-sur-Yon', latitude: 46.6705, longitude: -1.4260, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cholet', latitude: 47.0600, longitude: -0.8783, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Quentin', latitude: 49.8486, longitude: 3.2864, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bobigny', latitude: 48.9106, longitude: 2.4397, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bondy', latitude: 48.9022, longitude: 2.4828, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vannes', latitude: 47.6559, longitude: -2.7603, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Clamart', latitude: 48.8014, longitude: 2.2628, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Fontenay-sous-Bois', latitude: 48.8517, longitude: 2.4772, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Fréjus', latitude: 43.4330, longitude: 6.7370, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Arles', latitude: 43.6767, longitude: 4.6278, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sartrouville', latitude: 48.9372, longitude: 2.1644, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Corbeil-Essonnes', latitude: 48.6139, longitude: 2.4820, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bayonne', latitude: 43.4900, longitude: -1.4800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Ouen', latitude: 48.9123, longitude: 2.3342, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sevran', latitude: 48.9333, longitude: 2.5333, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cagnes-sur-Mer', latitude: 43.6644, longitude: 7.1489, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Massy', latitude: 48.7309, longitude: 2.2713, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Grasse', latitude: 43.6667, longitude: 6.9167, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montrouge', latitude: 48.8172, longitude: 2.3219, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vincennes', latitude: 48.8478, longitude: 2.4392, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vaulx-en-Velin', latitude: 45.7768, longitude: 4.9186, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Laval', latitude: 48.0733, longitude: -0.7689, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Suresnes', latitude: 48.8700, longitude: 2.2200, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Albi', latitude: 43.9289, longitude: 2.1464, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Martigues', latitude: 43.4053, longitude: 5.0475, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Évreux', latitude: 49.0200, longitude: 1.1500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Brive-la-Gaillarde', latitude: 45.1583, longitude: 1.5321, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Gennevilliers', latitude: 48.9333, longitude: 2.3000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Charleville-Mézières', latitude: 49.7719, longitude: 4.7161, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Herblain', latitude: 47.2122, longitude: -1.6497, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aubagne', latitude: 43.2908, longitude: 5.5708, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rosny-sous-Bois', latitude: 48.8667, longitude: 2.4833, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Priest', latitude: 45.6972, longitude: 4.9447, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Malo', latitude: 48.6481, longitude: -2.0075, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Blois', latitude: 47.5939, longitude: 1.3281, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Carcassonne', latitude: 43.2100, longitude: 2.3500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bastia', latitude: 42.7008, longitude: 9.4503, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Salon-de-Provence', latitude: 43.6406, longitude: 5.0972, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Meudon', latitude: 48.8123, longitude: 2.2382, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Choisy-le-Roi', latitude: 48.7630, longitude: 2.4090, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chalon-sur-Saône', latitude: 46.7806, longitude: 4.8528, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châlons-en-Champagne', latitude: 48.9575, longitude: 4.3650, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Germain-en-Laye', latitude: 48.8989, longitude: 2.0938, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Puteaux', latitude: 48.8850, longitude: 2.2389, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Livry-Gargan', latitude: 48.9192, longitude: 2.5361, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Brieuc', latitude: 48.5136, longitude: -2.7653, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mantes-la-Jolie', latitude: 48.9908, longitude: 1.7172, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Noisy-le-Sec', latitude: 48.8894, longitude: 2.4503, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Les Sables-d’Olonne', latitude: 46.4972, longitude: -1.7833, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Alfortville', latitude: 48.8050, longitude: 2.4239, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châteauroux', latitude: 46.8103, longitude: 1.6911, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Valenciennes', latitude: 50.3580, longitude: 3.5233, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sète', latitude: 43.4053, longitude: 3.6975, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Caluire-et-Cuire', latitude: 45.7953, longitude: 4.8472, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Istres', latitude: 43.5151, longitude: 4.9895, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Courneuve', latitude: 48.9322, longitude: 2.3967, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Garges-lès-Gonesse', latitude: 48.9728, longitude: 2.4008, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Talence', latitude: 44.8000, longitude: -0.5840, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Angoulême', latitude: 45.6500, longitude: 0.1600, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Castres', latitude: 43.6000, longitude: 2.2500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bron', latitude: 45.7394, longitude: 4.9139, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bourg-en-Bresse', latitude: 46.2056, longitude: 5.2289, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Tarbes', latitude: 43.2300, longitude: 0.0700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Cannet', latitude: 43.5769, longitude: 7.0194, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rezé', latitude: 47.1833, longitude: -1.5500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Arras', latitude: 50.2920, longitude: 2.7800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Wattrelos', latitude: 50.7000, longitude: 3.2170, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bagneux', latitude: 48.7983, longitude: 2.3137, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Gap', latitude: 44.5594, longitude: 6.0786, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Thionville', latitude: 49.3589, longitude: 6.1692, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Alès', latitude: 44.1281, longitude: 4.0817, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Compiègne', latitude: 49.4149, longitude: 2.8231, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Melun', latitude: 48.5406, longitude: 2.6600, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Douai', latitude: 50.3714, longitude: 3.0800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Gagny', latitude: 48.8833, longitude: 2.5333, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Draguignan', latitude: 43.5403, longitude: 6.4667, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Colomiers', latitude: 43.6139, longitude: 1.3367, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Anglet', latitude: 43.4850, longitude: -1.5183, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Stains', latitude: 48.9500, longitude: 2.3833, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Marcq-en-Baroeul', latitude: 50.6711, longitude: 3.0972, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chartres', latitude: 48.4560, longitude: 1.4840, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Martin-d’Hères', latitude: 45.1672, longitude: 5.7653, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Joué-lés-Tours', latitude: 47.3514, longitude: 0.6625, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Poissy', latitude: 48.9294, longitude: 2.0456, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châtillon', latitude: 48.8000, longitude: 2.2900, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villefranche-sur-Saône', latitude: 45.9833, longitude: 4.7167, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Échirolles', latitude: 45.1436, longitude: 5.7183, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villepinte', latitude: 48.9550, longitude: 2.5410, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Franconville', latitude: 48.9889, longitude: 2.2314, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Savigny-sur-Orge', latitude: 48.6797, longitude: 2.3457, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sainte-Geneviève-des-Bois', latitude: 48.6369, longitude: 2.3403, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Conflans-Sainte-Honorine', latitude: 48.9992, longitude: 2.0983, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Annemasse', latitude: 46.1958, longitude: 6.2364, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bagnolet', latitude: 48.8692, longitude: 2.4181, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Creil', latitude: 49.2583, longitude: 2.4833, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montluçon', latitude: 46.3408, longitude: 2.6033, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Palaiseau', latitude: 48.7145, longitude: 2.2457, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Ciotat', latitude: 43.1769, longitude: 5.6086, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Raphaël', latitude: 43.4252, longitude: 6.7684, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Neuilly-sur-Marne', latitude: 48.8537, longitude: 2.5490, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Chamond', latitude: 45.4775, longitude: 4.5153, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Thonon-les-Bains', latitude: 46.3627, longitude: 6.4750, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Auxerre', latitude: 47.7986, longitude: 3.5672, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Haguenau', latitude: 48.8200, longitude: 7.7900, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Roanne', latitude: 46.0367, longitude: 4.0689, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Athis-Mons', latitude: 48.7074, longitude: 2.3889, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villenave-d’Ornon', latitude: 44.7806, longitude: -0.5658, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Perreux-Sur-Marne', latitude: 48.8422, longitude: 2.5036, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mâcon', latitude: 46.3063, longitude: 4.8313, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Agen', latitude: 44.2049, longitude: 0.6212, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villeneuve-Saint-Georges', latitude: 48.7325, longitude: 2.4497, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Meyzieu', latitude: 45.7667, longitude: 5.0036, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vitrolles', latitude: 43.4600, longitude: 5.2486, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châtenay-Malabry', latitude: 48.7653, longitude: 2.2781, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Romans-sur-Isère', latitude: 45.0464, longitude: 5.0517, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nevers', latitude: 46.9933, longitude: 3.1572, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montigny-le-Bretonneux', latitude: 48.7711, longitude: 2.0333, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Marignane', latitude: 43.4160, longitude: 5.2145, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nogent-sur-Marne', latitude: 48.8375, longitude: 2.4833, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Six-Fours-les-Plages', latitude: 43.1009, longitude: 5.8200, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Les Mureaux', latitude: 48.9875, longitude: 1.9172, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Trappes', latitude: 48.7775, longitude: 2.0025, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cambrai', latitude: 50.1767, longitude: 3.2356, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Houilles', latitude: 48.9261, longitude: 2.1892, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Schiltigheim', latitude: 48.6078, longitude: 7.7500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châtellerault', latitude: 46.8178, longitude: 0.5461, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vigneux-sur-Seine', latitude: 48.7001, longitude: 2.4170, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Plaisir', latitude: 48.8183, longitude: 1.9472, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lens', latitude: 50.4322, longitude: 2.8333, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'L’Haÿ-les-Roses', latitude: 48.7800, longitude: 2.3374, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Médard-en-Jalles', latitude: 44.8964, longitude: -0.7164, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Viry-Châtillon', latitude: 48.6713, longitude: 2.3750, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cachan', latitude: 48.7919, longitude: 2.3319, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dreux', latitude: 48.7372, longitude: 1.3664, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Liévin', latitude: 50.4228, longitude: 2.7786, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pontoise', latitude: 49.0516, longitude: 2.1017, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Goussainville', latitude: 49.0325, longitude: 2.4747, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Charenton-le-Pont', latitude: 48.8265, longitude: 2.4050, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pierrefitte-sur-Seine', latitude: 48.9656, longitude: 2.3614, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Malakoff', latitude: 48.8169, longitude: 2.2944, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chatou', latitude: 48.8897, longitude: 2.1573, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rillieux-la-Pape', latitude: 45.8214, longitude: 4.8983, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vandœuvre-lès-Nancy', latitude: 48.6567, longitude: 6.1683, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Savigny-le-Temple', latitude: 48.5841, longitude: 2.5832, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Cloud', latitude: 48.8400, longitude: 2.2200, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Périgueux', latitude: 45.1929, longitude: 0.7217, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villemomble', latitude: 48.8833, longitude: 2.5000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Maubeuge', latitude: 50.2775, longitude: 3.9734, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aix-les-Bains', latitude: 45.6885, longitude: 5.9153, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mont-de-Marsan', latitude: 43.8900, longitude: -0.5000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bezons', latitude: 48.9261, longitude: 2.2178, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Clichy-sous-Bois', latitude: 48.9102, longitude: 2.5532, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vienne', latitude: 45.5242, longitude: 4.8781, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Ris-Orangis', latitude: 48.6537, longitude: 2.4161, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Garenne-Colombes', latitude: 48.9056, longitude: 2.2445, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Ermont', latitude: 48.9922, longitude: 2.2603, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Plessis-Robinson', latitude: 48.7811, longitude: 2.2633, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dieppe', latitude: 49.9200, longitude: 1.0800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Yerres', latitude: 48.7171, longitude: 2.4881, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Thiais', latitude: 48.7650, longitude: 2.3923, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sotteville-lès-Rouen', latitude: 49.4092, longitude: 1.0900, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Menton', latitude: 43.7750, longitude: 7.5000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Orange', latitude: 44.1383, longitude: 4.8097, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Draveil', latitude: 48.6852, longitude: 2.4080, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Grigny', latitude: 48.6562, longitude: 2.3849, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Étienne-du-Rouvray', latitude: 49.3786, longitude: 1.1050, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Guyancourt', latitude: 48.7714, longitude: 2.0739, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Agde', latitude: 43.3108, longitude: 3.4758, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Décines-Charpieu', latitude: 45.7694, longitude: 4.9594, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bègles', latitude: 44.8086, longitude: -0.5478, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Soissons', latitude: 49.3817, longitude: 3.3236, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villiers-sur-Marne', latitude: 48.8275, longitude: 2.5447, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Laurent-du-Var', latitude: 43.6680, longitude: 7.1880, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bourgoin-Jallieu', latitude: 45.5861, longitude: 5.2736, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Carpentras', latitude: 44.0558, longitude: 5.0489, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bois-Colombes', latitude: 48.9175, longitude: 2.2683, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Fresnes', latitude: 48.7550, longitude: 2.3221, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vanves', latitude: 48.8208, longitude: 2.2897, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villiers-le-Bel', latitude: 49.0094, longitude: 2.3911, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bergerac', latitude: 44.8500, longitude: 0.4800, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rambouillet', latitude: 48.6444, longitude: 1.8308, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saumur', latitude: 47.2600, longitude: -0.0769, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Dizier', latitude: 48.6383, longitude: 4.9497, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sens', latitude: 48.1975, longitude: 3.2877, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vierzon', latitude: 47.2225, longitude: 2.0694, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Alençon', latitude: 48.4306, longitude: 0.0931, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Aurillac', latitude: 44.9261, longitude: 2.4406, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saintes', latitude: 45.7464, longitude: -0.6333, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montbéliard', latitude: 47.5100, longitude: 6.8000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Étampes', latitude: 48.4343, longitude: 2.1615, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Muret', latitude: 43.4611, longitude: 1.3267, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Béthune', latitude: 50.5303, longitude: 2.6408, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Laon', latitude: 49.5639, longitude: 3.6244, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Libourne', latitude: 44.9200, longitude: -0.2400, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vichy', latitude: 46.1278, longitude: 3.4267, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rochefort', latitude: 45.9421, longitude: -0.9588, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Rodez', latitude: 44.3506, longitude: 2.5750, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dole', latitude: 47.0931, longitude: 5.4906, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Abbeville', latitude: 50.1058, longitude: 1.8358, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Épernay', latitude: 49.0403, longitude: 3.9600, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Torcy', latitude: 48.8502, longitude: 2.6508, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Millau', latitude: 44.0986, longitude: 3.0783, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Villeneuve-sur-Lot', latitude: 44.4081, longitude: 0.7050, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Chaumont', latitude: 48.1117, longitude: 5.1389, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Auch', latitude: 43.6465, longitude: 0.5855, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Forbach', latitude: 49.1900, longitude: 6.9000, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Beaune', latitude: 47.0250, longitude: 4.8397, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sarreguemines', latitude: 49.1100, longitude: 7.0700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dax', latitude: 43.7100, longitude: -1.0500, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Fougères', latitude: 48.3525, longitude: -1.1986, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lisieux', latitude: 49.1500, longitude: 0.2300, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Coutances', latitude: 49.0453, longitude: -1.4453, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Raincy', latitude: 48.8992, longitude: 2.5230, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Évry', latitude: 48.6328, longitude: 2.4405, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montargis', latitude: 47.9970, longitude: 2.7326, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Dinan', latitude: 48.4555, longitude: -2.0505, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Moulins', latitude: 46.5646, longitude: 3.3324, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lons-le-Saunier', latitude: 46.6754, longitude: 5.5557, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Guingamp', latitude: 48.5626, longitude: -3.1529, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vitry-le-François', latitude: 48.7247, longitude: 4.5844, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bayeux', latitude: 49.2786, longitude: -0.7040, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Clermont', latitude: 49.3790, longitude: 2.4126, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Tour-du-Pin', latitude: 45.5660, longitude: 5.4449, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Avranches', latitude: 48.6844, longitude: -1.3569, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vesoul', latitude: 47.6260, longitude: 6.1425, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Avesnes-sur-Helpe', latitude: 50.1237, longitude: 3.9257, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Arcachon', latitude: 44.6613, longitude: -1.1725, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Julien-en-Genevois', latitude: 46.1443, longitude: 6.0813, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Cognac', latitude: 45.6958, longitude: -0.3287, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lunéville', latitude: 48.5927, longitude: 6.4938, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pithiviers', latitude: 48.1718, longitude: 2.2518, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sedan', latitude: 49.7019, longitude: 4.9403, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Argelès-Gazost', latitude: 43.0027, longitude: -0.0991, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Albertville', latitude: 45.6759, longitude: 6.3926, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Le Puy-en-Velay', latitude: 45.0432, longitude: 3.8849, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Omer', latitude: 50.7483, longitude: 2.2609, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montreuil', latitude: 50.4637, longitude: 1.7635, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Parthenay', latitude: 46.6483, longitude: -0.2467, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mamers', latitude: 48.3496, longitude: 0.3694, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montbrison', latitude: 45.6075, longitude: 4.0653, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Provins', latitude: 48.5590, longitude: 3.2994, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Molsheim', latitude: 48.5414, longitude: 7.4924, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Château-Thierry', latitude: 49.0464, longitude: 3.4030, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Lô', latitude: 49.1138, longitude: -1.0819, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sarrebourg', latitude: 48.7356, longitude: 7.0572, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'La Châtre', latitude: 46.5823, longitude: 1.9873, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Argentan', latitude: 48.7444, longitude: -0.0202, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Tournon-sur-Rhône', latitude: 45.0672, longitude: 4.8327, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Issoire', latitude: 45.5442, longitude: 3.2490, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Jean-de-Maurienne', latitude: 45.2753, longitude: 6.3529, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vendôme', latitude: 47.7929, longitude: 1.0656, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Blaye', latitude: 45.1276, longitude: -0.6623, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mayenne', latitude: 48.3032, longitude: -0.6137, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Langon', latitude: 44.5528, longitude: -0.2499, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Altkirch', latitude: 47.6242, longitude: 7.2395, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Senlis', latitude: 49.2072, longitude: 2.5866, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bar-le-Duc', latitude: 48.7727, longitude: 5.1611, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Tulle', latitude: 45.2658, longitude: 1.7723, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Prades', latitude: 42.6175, longitude: 2.4218, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Thann', latitude: 47.8079, longitude: 7.1030, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Redon', latitude: 47.6517, longitude: -2.0842, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Château-Chinon (Ville)', latitude: 47.0645, longitude: 3.9322, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Morlaix', latitude: 48.5778, longitude: -3.8279, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Verdun', latitude: 49.1596, longitude: 5.3829, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pontivy', latitude: 48.0683, longitude: -2.9664, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Guéret', latitude: 46.1718, longitude: 1.8717, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Riom', latitude: 45.8936, longitude: 3.1126, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Amand-Montrond', latitude: 46.7228, longitude: 2.5049, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Foix', latitude: 42.9653, longitude: 1.6071, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Vire', latitude: 48.8385, longitude: -0.8893, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Toul', latitude: 48.6808, longitude: 5.8912, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Brioude', latitude: 45.2942, longitude: 3.3842, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Privas', latitude: 44.7350, longitude: 4.5992, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Montdidier', latitude: 49.6480, longitude: 2.5699, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Bonneville', latitude: 46.0778, longitude: 6.4089, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saverne', latitude: 48.7407, longitude: 7.3650, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Châteaudun', latitude: 48.0709, longitude: 1.3378, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Saint-Dié-des-Vosges', latitude: 48.2843, longitude: 6.9492, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Péronne', latitude: 49.9322, longitude: 2.9363, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Pontarlier', latitude: 46.9061, longitude: 6.3548, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Nogent-le-Rotrou', latitude: 48.3216, longitude: 0.8218, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Marmande', latitude: 44.5036, longitude: 0.1655, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Sélestat', latitude: 48.2619, longitude: 7.4489, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Mortagne-au-Perche', latitude: 48.5202, longitude: 0.5473, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Briançon', latitude: 44.8966, longitude: 6.6346, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Lannion', latitude: 48.7326, longitude: -3.4566, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Fontenay-le-Comte', latitude: 46.4667, longitude: -0.8062, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Château-Gontier', latitude: 47.8287, longitude: -0.7027, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {label: 'Segré', latitude: 47.6867, longitude: -0.8727, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
];
  lastSelectedLayer: any;
  selectedPoint: IMapPoint = null;
  searchResults: NominatimResponse[] = [];

  @ViewChild('newPositionDetail') newPositionDetail;
  @ViewChild('positionDetail') positionDetail;

  constructor(private modalService: NgbModal, private nominatimService: NominatimService) { }

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
      center: latLng(this.mapPoints[0].latitude, this.mapPoints[0].longitude),
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
    this.selectedPoint = pt;
    this.modalService.dismissAll();
    this.unselectPoint();
    this.openModal(this.positionDetail);
    console.log('rr');
  }
  onMapClick(lat, lng) {

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
      label: 'Unknown Position',
      latitude: lat,
      longitude: lng,
      tags: []
    };
    this.openModal(this.newPositionDetail);
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
    console.log(this.searchResults);
  }

}
