export class UserSpotInfo {
  spots: SpotInfo[];

  constructor() {
    this.spots = [];
  }
}

interface SpotInfo {
  idSpot: number;
  dateTime: Date;
  service: string;
  unit: string;
  pricePerUnit: number;
}
