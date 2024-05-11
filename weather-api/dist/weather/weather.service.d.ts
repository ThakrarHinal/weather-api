export declare class WeatherService {
    private cache;
    constructor();
    getWeatherForecast(latitude: number, longitude: number): Promise<any>;
    getHistoricalWeatherData(numberOfDays: number): Promise<any>;
}
