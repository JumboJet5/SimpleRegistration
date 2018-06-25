import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ResData} from './res-data';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegFormService {

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private http: HttpClient) {
  }

  regForm: FormGroup;
  isSubmit: boolean;
  public confirmCode: string;

  buildForm() {
    this.isSubmit = false;
    this.regForm = this.formBuilder.group({
      userFirstName: this.formBuilder.control(null, Validators.required),
      userLastName: this.formBuilder.control(null, Validators.required),
      userEmail: this.formBuilder.control(null, Validators.required),
      userPassword: this.formBuilder.control(null, Validators.required),
      userRepeated: this.formBuilder.control(null, Validators.required)
    });
  }

  isWrongInput(): boolean {
    return this.regForm.value.userPassword && this.regForm.value.userPassword !== this.regForm.value.userRepeated;
  }

  onSubmitForm() {
    if (!this.isWrongInput()) {
      this.isSubmit = true;
      this.http.post<ResData>('app/send-email', this.regForm.value, httpOptions).pipe(
        tap((res: ResData) => {
          this.confirmCode = res.code;
          console.log('success');
          this.gotoConfirmCode();
        }),
        catchError(this.handleError('send email'))
      );
      // temp redirect
      this.gotoConfirmCode();
    } else {
      this.forWrongInput();
    }
    this.regForm.reset();
  }

  gotoConfirmCode() {
    // temp generate confirm code
    this.confirmCode = '1111';
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

  forWrongInput() {
    console.error('wrong input');
  }
}
