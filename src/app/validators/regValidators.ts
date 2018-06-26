import { AbstractControl, ValidatorFn } from '@angular/forms';

const emailReg = (/^[\w\.-]+@\w+\.\w+$/i);

export function validRepeated(getPassword: () => string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return getPassword() !== control.value ? {'Not valid password confirmation': {value: control.value}} : null;
  };
}

export function validEmail(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return !emailReg.test(control.value) ? {'Wrong email': {value: control.value}} : null;
  };
}
