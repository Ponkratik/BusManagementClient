import { Time } from "@angular/common";
import { Busstop } from "./busstop.model";
import { Route } from "./route.model";

export class Routebusstop {
    routeByRouteId!: Route;
    busstopByStopId!: Busstop;
    order!: number;
    timeDelta!: Time;
}
