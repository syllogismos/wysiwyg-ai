import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'validation',
  templateUrl: '../forms/validation.html',
  providers: [FormBuilder]
})

export class ValidationComponent implements OnInit {

  /*
   * https://toddmotto.com/angular-2-forms-reactive#ngmodule-and-reactive-forms
   * https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#live-example
   */

  form: FormGroup;
  output: any;
  submittedForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      url: ['', [Validators.required]],
      alphanumeric: ['', [Validators.required]],
      alpha: ['', [Validators.required]],
      numeric: ['', [Validators.required]],
      min: ['', [Validators.required, Validators.minLength(4)]],
      max: ['', [Validators.required, Validators.maxLength(8)]],
      range: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
    this.form.valueChanges.subscribe(data => {
      console.log('form changes', data)
      this.output = data
    })
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.submittedForm = this.form.value;
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
  }

}
