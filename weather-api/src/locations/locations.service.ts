// src/locations/locations.service.ts

import { Location } from './location.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LocationsService {
  async createLocation(locationData: any): Promise<Location> {
    if (!this.isValidLocationData(locationData)) {
        throw new BadRequestException('Invalid location data. Please provide a valid name, latitude, and longitude.');
      }
    return Location.create(locationData);
  }

  async getAllLocations(): Promise<Location[]> {
    return Location.findAll();
  }

  async getLocationById(id: number): Promise<Location> {
    if (!this.isValidId(id)) {
        throw new BadRequestException('Invalid location ID. Please provide a valid number.');
      }
    const result = Location.findByPk(id);
    if (!result) {
      throw new NotFoundException('Location not found.');
    }
    return result
  }

  async updateLocation(id: number, locationData: any): Promise<[number, Location[]]> {
    if (!this.isValidLocationData(locationData)) {
        throw new BadRequestException('Invalid location data. Please provide a valid name, latitude, and longitude.');
      }
      const existingLocation = await Location.findByPk(id);
      if (!existingLocation) {
        throw new NotFoundException('Location not found.');
      }
    const [affectedCount, affectedRows] = await Location.update(locationData, { where: { id }, returning: true });
    return [affectedCount, affectedRows];
  }

  async deleteLocation(id: number): Promise<void> {
    if (!this.isValidId(id)) {
        throw new BadRequestException('Invalid location ID. Please provide a valid number.');
      }
      const existingLocation = await Location.findByPk(id);
      if (!existingLocation) {
        throw new NotFoundException('Location not found.');
      }
    await Location.destroy({ where: { id } });
  }

  private isValidLocationData(locationData: any): boolean {
    return (
      locationData &&
      typeof locationData.name === 'string' &&
      typeof locationData.latitude === 'number' &&
      typeof locationData.longitude === 'number'
    );
  }

  private isValidId(id: number): boolean {
    return !isNaN(id) && Number.isInteger(id) && id > 0;
  }
}
