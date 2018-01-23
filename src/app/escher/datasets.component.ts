import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

declare const $: any;
declare const approve: any;
declare const toastr: any;


@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  urls: any;
  constructor(
    private http: Http
  ) { }
  datasets: any;

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.getDataSets();

    this.validateOnChange('#name', {
      title: 'Dataset Name',
      required: true
    }, "Valid Dataset name", "Name can't be empty")

    this.validateOnChange('#s3', {
      title: 'S3 URI',
      required: true
    }, "Valid S3 URI", "S3 field can't be empty")

    this.validateOnChange('#description', {
      title: 'Description',
      required: true
    }, "Valid Description", "Description can't be empty")


    $('#dataset_upload').submit(e => {
      e.preventDefault();
      var fields = []
      $('#dataset_upload .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === 'true'? true: false)
      })
      console.log(fields)
      if (fields.includes(false)) {
        return false
      }

      var params = {}
      var json_response

      $('.dataset-params').serializeArray().map(x => params[x.name] = x.value)
      console.log(params)

      this.http.post('/api/savedataset', params)
        .toPromise()
        .then(response => {
          console.log('right after post request')
          console.log(response)
          console.log(response.json())
          toastr.options = {
            iconClass: '',
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          }
          toastr.success('Dataset Created')
        })

    })
  }

  getDataSets(): void {

  }

  validateOnChange(element, rules, successMessage, errorMessage) {
    var self = this;
    $(document).on('focus', element, function (e) {
      e.preventDefault();
      return false;
    });
    $(document).on('input', element, function (e) {
      e.preventDefault();
      var result = approve.value($(element).val(), rules);
      if (result.approved) {
        self.isSuccess(element, successMessage);
      } else {
        self.isError(element, errorMessage)
      }
      return false;
    });
    $(document).on('blur', element, function (e) {
      e.preventDefault();
      var result = approve.value($(element).val(), rules);
      if (result.approved) {
        self.isSuccess(element, successMessage);
      } else {
        self.isError(element, errorMessage)
      }
      return false;
    });
  }

  handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  isError(element, message) {
    var el = $(element)
    el.parent().removeClass('has-success').addClass('has-danger');
    el.removeClass('form-control-success').addClass('form-control-danger');
    if (message != '') {
    el.next().text(message).removeClass('text-success').addClass('text-danger');
    }
    el.attr('data-valid', false);
  }

  isSuccess(element, message) {
    var el = $(element);
    el.parent().removeClass('has-danger').addClass('has-success');
    el.removeClass('form-control-danger').addClass('form-control-success');
    if (message != '') {
    el.next().text(message).removeClass('text-danger').addClass('text-success');
    }
    el.attr('data-valid', true);
  }

  resetMessage(element) {
    var el = $(element);
    el.parent().removeClass('has-danger').removeClass('has-success');
    el.removeClass('form-control-danger').removeClass('form-control-success');
    el.next().text('');
  }


  saveDataset(): void {

  }

}
