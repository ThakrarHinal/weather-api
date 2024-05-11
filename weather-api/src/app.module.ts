import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { WeatherModule } from './weather/weather.module';
import { sequelize } from './sequelize.config';

@Module({
  imports: [LocationsModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    sequelize.sync();
  }
}
