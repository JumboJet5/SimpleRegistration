import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegFormService} from '../reg-form.service';
import { ResData } from '../res-data';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit {
  confirmCode: string;

  constructor(
    private router: Router,
    private regService: RegFormService
  ) { }

  ngOnInit() {
  }

  check() {
    if (this.regService.isSubmit && this.regService.confirmCode === this.confirmCode) {
      this.router.navigate(['/welcome']);
    } else {
      alert('wrong code');
    }
  }
}
