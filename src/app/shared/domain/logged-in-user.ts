export class LoggedInUser {
  public id: number;
  public auth_token: string;
  public email: string;
  public fullname: string;
  public avatar: string;
  
  constructor(auth_token: string, email: string, fullname: string, avatar: string) {
    this.auth_token = auth_token;
    this.email = email;
    this.fullname = fullname;
    this.avatar = avatar;
  }
}