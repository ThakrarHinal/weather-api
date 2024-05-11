import { LocationsService } from './locations.service';
import { Location } from './location.model';
export declare class LocationsController {
    private locationsService;
    constructor(locationsService: LocationsService);
    getAllLocations(): Promise<Location[]>;
    getLocationById(id: string): Promise<Location>;
    createLocation(locationData: any): Promise<Location>;
    updateLocation(id: string, locationData: any): Promise<[number, Location[]]>;
    deleteLocation(id: string): Promise<void>;
}
