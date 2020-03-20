import { Component } from '@angular/core';
import { Functions } from 'src/app/utilities.functions';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public logEmail: string = "";
  public logPass: string = "";
  public signEmail: string = "";
  public signPass: string = "";
  public signConfPass: string = "";

  public showNewUser: boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  /**
   * login
   */
  public logIn() {
    if (Functions.IsNullOrUndefined(this.logEmail) || Functions.IsStringEmpty(this.logEmail))
      return;

    if (Functions.IsNullOrUndefined(this.logPass) || Functions.IsStringEmpty(this.logPass))
      return;

    this.authenticationService.login(this.logEmail, this.logPass);
  }

  /**
   * signUp
   */
  public signUp() {
    if (Functions.IsNullOrUndefined(this.signEmail) || Functions.IsStringEmpty(this.signEmail) || Functions.validateEmail(this.signEmail) == false)
      return;

    if (Functions.IsNullOrUndefined(this.signPass) || Functions.IsStringEmpty(this.signPass))
      return;

    if (Functions.IsNullOrUndefined(this.signConfPass) || Functions.IsStringEmpty(this.signConfPass))
      return;

    if (this.signPass != this.signConfPass)
      return;

    this.authenticationService.signUp(this.signEmail, this.signPass);
  }

  /**
   * toggle login/create form
   */
  public toggleCreate() {
    this.showNewUser = !this.showNewUser;
  }

  /**
   * binding the enter keybord to login and register
   * @param event
   */
  public onEnter(event: any) {
    if (this.showNewUser == false) {
      //loginIn
      this.logIn();
    } else {
      //registering
      this.signUp();
    }
  }

}
