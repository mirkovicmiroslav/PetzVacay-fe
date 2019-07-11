export class PetSitterInfo {
  serviceAddress: string;
  phoneNumber: number;
  services: number[];
  shortDescription: string;
  experience: string;
  socialMediaFacebook: string;
  socialMediaInstagram: string;
  socialMediaTwitter: string;
  socialMediaWebsite: string;
  referenceFirst: string;
  referenceSecond: string;

  constructor() {
    this.serviceAddress = '';
    this.phoneNumber;
    this.services = [];
    this.shortDescription = '';
    this.experience = '';
    this.socialMediaFacebook = '';
    this.socialMediaInstagram = '';
    this.socialMediaTwitter = '';
    this.socialMediaWebsite = '';
    this.referenceFirst = '';
    this.referenceSecond = '';
  }
}
