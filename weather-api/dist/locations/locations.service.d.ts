import { Location } from './location.model';
export declare class LocationsService {
    createLocation(locationData: any): Promise<Location>;
    getAllLocations(): Promise<Location[]>;
    getLocationById(id: number): Promise<Location>;
    updateLocation(id: number, locationData: any): Promise<[number, Location[]]>;
    deleteLocation(id: number): Promise<void>;
}
