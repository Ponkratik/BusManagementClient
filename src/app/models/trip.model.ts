import { Bus } from "./bus.model";
import { Route } from "./route.model";
import { User } from "./user.model";

export class Trip {
    tripId!: number;
    depTime!: Date;
    price!: number;
    routeByRouteId!: Route;
    userByUserId!: User;
    busByBusId!: Bus;
}
