// src/locations/locations.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.model';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async getAllLocations(): Promise<Location[]> {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Location> {
    return this.locationsService.getLocationById(+id);
  }

  @Post()
  async createLocation(@Body() locationData: any): Promise<Location> {
    return this.locationsService.createLocation(locationData);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: string, @Body() locationData: any): Promise<[number, Location[]]> {
    return this.locationsService.updateLocation(+id, locationData);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<void> {
    return this.locationsService.deleteLocation(+id);
  }
}
