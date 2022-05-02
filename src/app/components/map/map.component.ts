import { AfterViewInit, Component, OnInit } from '@angular/core';
//import * as L from "leaflet";
var L = require('leaflet');
require('leaflet-routing-machine');
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { icon, Icon, latLng, Layer, map, Map, Marker, TileLayerOptions } from 'leaflet';
//import "leaflet";
//import "leaflet-routing-machine";
import { Busstop } from 'src/app/models/busstop.model';
import { Routebusstop } from 'src/app/models/routebusstop.model';
import { RoutebusstopService } from 'src/app/_services/routebusstop.service';
//declare let L: { LatLng: new (arg0: number, arg1: number) => any; icon: (arg0: { iconUrl: string; shadowUrl: string; }) => any; Routing: { control: (arg0: { waypoints: any[]; routeWhileDragging: boolean; }) => { (): any; new(): any; addTo: { (arg0: Map): void; new(): any; }; }; }; latLng: (arg0: number, arg1: number) => any; TileLayer: new (arg0: string, arg1: TileLayerOptions) => Layer; };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
  //map = L.map('map');

  options = {
    layers: getLayers(),
    zoom: 12,
    center: new L.LatLng(53.89135, 27.553013)
  };

  private defaultIcon: Icon = icon({
    iconUrl: "assets/leaflet/images/marker-icon.png",
    shadowUrl: "assets/leaflet/images/marker-shadow.png"
  });

  private initMap(): void {
    L.map('map', {
      layers: getLayers(),
      zoom: 12,
      center: new L.LatLng(53.89135, 27.553013)
    });
    L.Routing.control({
      waypoints: this.wayp,
      routeWhileDragging: true
    }).addTo(map);
  }

  constructor(private routeBusstopService: RoutebusstopService) { }

  ngAfterViewInit(): void {
    Marker.prototype.options.icon = this.defaultIcon;
    //this.initMap();
  }

  private wayp: Array<L.LatLng> = new Array;

  setWaypoint(arr: Routebusstop[]) {
    this.wayp = [];
    arr.forEach((stop: Routebusstop) => {
      this.wayp.push(L.latLng(stop.busstopByStopId.latitude, stop.busstopByStopId.longitude));
    })
    console.log(this.wayp);
    this.initMap();

    //this.map.Routing.control.getPlan().setWaypoints(this.wayp);

  }

  //L.latLng(53.89135, 27.553013), L.latLng(53.915195, 27.583511), L.latLng(53.938397, 27.666075)

  onMapReady() {
    L.Routing.control({
      waypoints: this.wayp,
      routeWhileDragging: true
    }).addTo(map);
  }

}


export const getLayers = (): L.Layer[] => {
  return [
    new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as L.TileLayerOptions),
  ] as L.Layer[];
};
