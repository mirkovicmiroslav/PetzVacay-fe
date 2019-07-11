export class ServiceTypes {
  services: Service[];

  constructor() {
    this.services = [];
  }
}

interface Service {
  idService: number;
  description: string;
  checked?: boolean;
}
