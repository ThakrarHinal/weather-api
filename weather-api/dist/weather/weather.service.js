"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cacheManager = require("cache-manager");
const redisStore = require("cache-manager-redis-store");
let WeatherService = class WeatherService {
    constructor() {
        this.cache = cacheManager.caching({
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 600,
        });
    }
    async getWeatherForecast(latitude, longitude) {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        try {
            const cachedData = await this.cache.get(url);
            if (cachedData) {
                return cachedData;
            }
            const response = await axios_1.default.get(url);
            const weatherData = response.data;
            await this.cache.set(url, weatherData);
            return weatherData;
        }
        catch (error) {
            throw new Error('Unable to fetch weather data');
        }
    }
    async getHistoricalWeatherData(numberOfDays) {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={latitude}&lon={longitude}&dt={unixtime}&appid=${apiKey}`;
        const currentTime = Math.floor(Date.now() / 1000);
        const startTime = currentTime - (numberOfDays * 24 * 60 * 60);
        const endTime = currentTime;
        try {
            const response = await axios_1.default.get(url, {
                params: {
                    start: startTime,
                    end: endTime,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error('Unable to fetch historical weather data');
        }
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WeatherService);
//# sourceMappingURL=weather.service.js.map