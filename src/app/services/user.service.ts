import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;

  constructor() { }

  setUser(user:any){
    this.user = user;
  }

}
