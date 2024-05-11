import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class WeatherService {
  private cache;

  constructor() {
    this.cache = cacheManager.caching({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 600, // 10 minutes
      });
  }

  async getWeatherForecast(latitude: number, longitude: number): Promise<any> {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const cachedData = await this.cache.get(url);
      if (cachedData) {
        return cachedData;
      }

      const response = await axios.get(url);
      const weatherData = response.data;

      await this.cache.set(url, weatherData);

      return weatherData;
    } catch (error) {
      throw new Error('Unable to fetch weather data');
    }
  }

  async getHistoricalWeatherData(numberOfDays: number): Promise<any> {
     // Logic to fetch historical weather data from an external service
     const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Get your API key
     const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={latitude}&lon={longitude}&dt={unixtime}&appid=${apiKey}`;
 
     // Calculate the timestamps for the start and end of the historical period
     const currentTime = Math.floor(Date.now() / 1000);
     const startTime = currentTime - (numberOfDays * 24 * 60 * 60);
     const endTime = currentTime;
 
     try {
       const response = await axios.get(url, {
         params: {
           start: startTime,
           end: endTime,
         },
       });
       return response.data;
     } catch (error) {
       throw new Error('Unable to fetch historical weather data');
     }
   }
}
// }
