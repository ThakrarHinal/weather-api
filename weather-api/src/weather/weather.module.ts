import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { LocationsController } from 'src/locations/locations.controller';
import { WeatherController } from './weather.controller';
import { LocationsService } from 'src/locations/locations.service';

@Module({
  providers: [WeatherService, LocationsService],
  controllers: [LocationsController, WeatherController]
})
export class WeatherModule {}
