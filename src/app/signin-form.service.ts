import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {validEmail} from './validators/regValidators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SigninFormService {

  constructor(private router: Router,
              public formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  signInForm: FormGroup;
  isSubmit: boolean;

  static forWrongInput() {
    alert('wrong input');
  }

  buildForm() {
    this.isSubmit = false;
    this.signInForm = this.formBuilder.group({
      userEmail: this.formBuilder.control('', [Validators.required, validEmail()]),
      userPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmitForm() {
    // const res = this.http.get().pipe(
    //   catchError(this.handleError('SignIn'))
    // );
    if (res) {
      this.gotoWelcome();
      this.signInForm.reset();
    } else {
      SigninFormService.forWrongInput();
    }
  }

  gotoWelcome() {
    this.router.navigate(['/welcome']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
