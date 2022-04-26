import { City } from "./city.model";

export class Busstop {
    stopId!: number;
    stopName!: string;
    intermediate!: boolean;
    latitude!: number;
    longitude!: number;
    cityByCityId!: City;
}
