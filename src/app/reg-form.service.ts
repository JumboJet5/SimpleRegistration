import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ResData} from './res-data';
import {validRepeated, validEmail} from './validators/regValidators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegFormService {

  constructor(private router: Router,
              public formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  public regForm: FormGroup;
  public isSubmit: boolean;
  public confirmCode: string;

  // temp generate confirm code
  static getConfirmCode(res) {
    return res.code ? res.code : '1111';
  }

  buildForm() {
    const getPassword = () => this.regForm ? this.regForm.value.userPassword : '';
    this.isSubmit = false;
    this.regForm = this.formBuilder.group({
      userFirstName: this.formBuilder.control('', Validators.required),
      userLastName: this.formBuilder.control('', Validators.required),
      userEmail: this.formBuilder.control('', [Validators.required, validEmail()]),
      userPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      userRepeated: this.formBuilder.control('', [Validators.required, validRepeated(getPassword)])
    });
  }

  onSubmitForm() {
    this.isSubmit = true;
    const res = this.http.post<ResData>('app/send-email', this.regForm.value, httpOptions).pipe(
      catchError(this.handleError('send email'))
    );
    this.gotoConfirmCode(res);
    this.regForm.reset();
  }

  gotoConfirmCode(res) {
    this.confirmCode = RegFormService.getConfirmCode(res);
    this.router.navigate(['/code']);
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
