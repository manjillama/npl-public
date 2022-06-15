import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Mappable } from '../interfaces';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export class CreateMap {
  private map: any;
  // private bounds = new mapboxgl.LngLatBounds();

  constructor(divId: string) {
    this.map = new mapboxgl.Map({
      container: divId,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 14
    });
  }

  addMarker(mappable: Mappable): void {
    const { coordinates } = mappable.location;
    new mapboxgl.Marker().setLngLat(coordinates).addTo(this.map);
    this.map.setCenter({
      lat: coordinates[1],
      lng: coordinates[0]
    });
  }
}
