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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const common_1 = require("@nestjs/common");
const weather_service_1 = require("./weather.service");
let WeatherController = class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }
    async getWeatherForecast(latitude, longitude) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        return this.weatherService.getWeatherForecast(lat, lon);
    }
    async getHistoricalWeatherData(days) {
        const numberOfDays = parseInt(days);
        if (![7, 15, 30].includes(numberOfDays)) {
            throw new Error('Invalid number of days. Please provide 7, 15, or 30.');
        }
        return this.weatherService.getHistoricalWeatherData(numberOfDays);
    }
};
exports.WeatherController = WeatherController;
__decorate([
    (0, common_1.Get)(':latitude/:longitude'),
    __param(0, (0, common_1.Param)('latitude')),
    __param(1, (0, common_1.Param)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "getWeatherForecast", null);
__decorate([
    (0, common_1.Get)('history/:days'),
    __param(0, (0, common_1.Param)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "getHistoricalWeatherData", null);
exports.WeatherController = WeatherController = __decorate([
    (0, common_1.Controller)('weather'),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherController);
//# sourceMappingURL=weather.controller.js.map