import {Injectable} from '@angular/core';

@Injectable()
export class OsmRoutingService {
  constructor() {
  }
  getIconClass(type: string): string {
    switch (type) {
      case 'Head':
        return 'leaflet-routing-icon-depart';
      case 'Straight':
        return '';
      case 'continue':
        return 'leaflet-routing-icon-continue';
      case 'SlightRight':
        return '';
      case 'Right':
        return 'leaflet-routing-icon-turn-right';
      case 'SharpRight':
        return '';
      case 'TurnAround':
        return '';
      case 'SharpLeft':
        return '';
      case 'Left':
        return 'leaflet-routing-icon-turn-left';
      case 'SlightLeft':
        return '';
      case 'WaypointReached':
        return '';
      case 'Roundabout':
        return 'leaflet-routing-icon-enter-roundabout';
      case 'StartAt':
        return '';
      case 'DestinationReached':
        return '';
      case 'EnterAgainstAllowedDirection':
        return '';
      case 'LeaveAgainstAllowedDirection':
        return '';
      default:
        return '';
    }
  }
}
