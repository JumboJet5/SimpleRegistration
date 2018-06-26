import { Component, OnInit } from '@angular/core';
import { SigninFormService } from '../signin-form.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  constructor(private signInService: SigninFormService) { }

  ngOnInit() {
    this.signInService.buildForm();
  }

}
