export class ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
}
