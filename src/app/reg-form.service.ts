import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegFormService {

  constructor(
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  regForm: FormGroup;
  buildForm() {
    this.regForm = this.formBuilder.group({
      userFirstName: this.formBuilder.control(null, Validators.required),
      userLastName: this.formBuilder.control(null, Validators.required),
      userEmail: this.formBuilder.control(null, Validators.required),
      userPassword: this.formBuilder.control(null, Validators.required),
      userRepeated: this.formBuilder.control(null, Validators.required)
    });
  }

  onSubmitForm() {
    if (this.regForm.value.userPassword === this.regForm.value.userRepeated) {
       console.log(this.regForm.value);
       this.gotoCode();
    } else {
      console.log('er');
    }
    this.regForm.reset();
  }

  gotoCode() {
    this.router.navigate(['/code']);
  }
}
