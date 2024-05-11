import { WeatherService } from './weather.service';
export declare class WeatherController {
    private weatherService;
    constructor(weatherService: WeatherService);
    getWeatherForecast(latitude: string, longitude: string): Promise<any>;
    getHistoricalWeatherData(days: string): Promise<any>;
}
