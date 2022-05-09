import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  state: ymaps.IMapState = {
    center: [53.902690, 27.557743],
    zoom: 12,
  };

  options: ymaps.IMapOptions = {
    
  };

  referencePoints: ymaps.IMultiRouteReferencePoint[] = []

  constructor() { }

  ngOnInit(): void {
  }

  changeGeoPoints(points: ymaps.IMultiRouteReferencePoint[]) {
    this.referencePoints = points;    
  }

}
