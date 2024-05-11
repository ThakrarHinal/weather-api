// src/weather/weather.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get(':latitude/:longitude')
  async getWeatherForecast(@Param('latitude') latitude: string, @Param('longitude') longitude: string): Promise<any> {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    return this.weatherService.getWeatherForecast(lat, lon);
  }

  @Get('history/:days')
  async getHistoricalWeatherData(@Param('days') days: string): Promise<any> {
    const numberOfDays = parseInt(days);
    if (![7, 15, 30].includes(numberOfDays)) {
      throw new Error('Invalid number of days. Please provide 7, 15, or 30.');
    }
    return this.weatherService.getHistoricalWeatherData(numberOfDays);
  }
}
