"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsService = void 0;
const location_model_1 = require("./location.model");
const common_1 = require("@nestjs/common");
let LocationsService = class LocationsService {
    async createLocation(locationData) {
        return location_model_1.Location.create(locationData);
    }
    async getAllLocations() {
        return location_model_1.Location.findAll();
    }
    async getLocationById(id) {
        return location_model_1.Location.findByPk(id);
    }
    async updateLocation(id, locationData) {
        const [affectedCount, affectedRows] = await location_model_1.Location.update(locationData, { where: { id }, returning: true });
        return [affectedCount, affectedRows];
    }
    async deleteLocation(id) {
        await location_model_1.Location.destroy({ where: { id } });
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)()
], LocationsService);
//# sourceMappingURL=locations.service.js.map