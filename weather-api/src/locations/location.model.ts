// src/locations/location.model.ts

import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Location extends Model {
  @Column
  name: string;

  @Column
  latitude: number;

  @Column
  longitude: number;
}
