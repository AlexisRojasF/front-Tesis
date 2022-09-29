import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @ViewChild('f') forogtPasswordForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute) { }
  
  onSubmit() {
    this.forogtPasswordForm.reset();
  }

  // On login link click
  onLogin() {
      this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  // On registration link click
  onRegister() {
      this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

}
