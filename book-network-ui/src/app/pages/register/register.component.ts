import {Component} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  };
  errorMsg: Array<String> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest,
    }).subscribe({
      next: (res) => {
        console.log(">>>>>", res);
        this.router.navigate(['activate-account']);
      },
      error: err => {
        console.log(">>>>>>>>", err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    })
  }
}
