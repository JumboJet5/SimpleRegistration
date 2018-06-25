import { Component, OnInit } from '@angular/core';
import { RegFormService } from '../reg-form.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  constructor(private regService: RegFormService) { }

  ngOnInit() {
    this.regService.buildForm();
  }

}
