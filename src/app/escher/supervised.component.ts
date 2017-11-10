import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";

declare var $: any;
declare var typeahead: any;
declare var approve: any;
declare var swal: any;
declare var _: any;
declare var toastr: any;

@Component({
  selector: 'app-supervised',
  templateUrl: './supervised.component.html',
  styleUrls: ['./supervised.component.scss']
})
export class SupervisedComponent implements OnInit {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    var numericRange = {
      expects: [
        'max',
        'min'
      ],
      message: '{title} must be between {max} and {min}',
      validate: function (value, pars) {
        var every_char_check = _.every(value, x => _.includes('0123456789.,', x))
        var single_param_check = x => (parseFloat(x) >= pars.min) && (parseFloat(x) <= pars.max)
        if (every_char_check) {
          return _.every(value.split(','), single_param_check)
        } else {
          return false
        }
        // return (parseFloat(value) >= pars.min) && (parseFloat(value) <= pars.max)
      }
    };
    approve.addTest(numericRange, 'numericRange')

    this.validateOnChange('#exp_name', {
      title: 'Experiment Name',
      required: true
    }, 'Experiment Name is valid', 'Please select a valid name')

    this.validateOnChange('#exp_desc', {
      title: 'Experiment Description',
      required: true
    }, 'Experiment Description is valid', 'Please select a valid desc')

    this.validateOnChange('#optim', {
      title: 'Optimizer function',
      required: true
    }, 'Optimizer is valid', 'Please select an option')

    this.validateOnChange('#loss', {
      title: 'Loss Function',
      required: true
    }, 'Loss Function is valid', 'Please select an option')

    this.validateOnChange('#lr', {
      title: 'Learning rate',
      required: true,
      numericRange: {
        min: 0,
        max: 1
      },
    }, 'Learning rate is valid', 'Please select number between 0 and 1')

    this.validateOnChange('#momentum', {
      title: 'Momentum',
      numericRange: {
        min: 0,
        max: 1
      },
      required: true
    }, 'Momentum is valid', 'Please select a value between 0 and 1')

    this.validateOnChange('#model', {
      title: 'Model',
      required: true
    }, 'Model is valid', 'Please select an option')

    this.validateOnChange('#test_batch_size', {
      title: 'Test batch size',
      required: true,
      numericRange: {
        min: 0,
        max: 1000000
      }
    }, 'Test batch size valid', 'Please select a number between 0 and 1000000')

    this.validateOnChange('#batch_size', {
      title: 'Batch size',
      required: true,
      numericRange: {
        min: 0,
        max: 1000000
      }
    }, 'Batch size is valid', 'Please select a number between 0 and 1000000')

    this.validateOnChange('#epochs', {
      title: 'Epochs',
      required: true,
      numericRange: {
        min: 1,
        max: 100000
      }
    }, 'No of epochs is valid', 'Please select a number between 1 and 100000')

    this.validateOnChange('#seed', {
      title: 'Seed',
      required: true,
      numericRange: {
        min: 1,
        max: 100000
      }
    }, 'Seed is valid', 'Please enter a valid numeric seed')

    this.validateOnChange('#dataset', {
      title: 'Dataset',
      required: true
    }, 'Dataset is valid', 'Please select an option')

    this.validateOnChange('#machine_type', {
      title: 'Machine Type',
      required: true
    }, 'Machine type is valid', 'Please select machine type')

    var self = this;

    $('#sup').submit(function (e) {
      e.preventDefault();
      var fields = []
      $('#sup .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === 'true' ? true : false);
      });
      if (fields.includes(false)) {
        return false
      }

      var variantCount = 1
      $('#sup .variant').each(function () {
        console.log()
        variantCount = variantCount * $(this).val().split(',').length
      })

      if (variantCount > 10) {
        console.log(variantCount, 'variant count')
        toastr.options = {
          iconClass: '',
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        }
        toastr.error('Dont support more than 9 variants')
        return false
      }

      var params = {}
      var json_response

      swal({
        title: 'Are you sure?',
        text: 'You will be launching machines to train the Supervised exp',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, launch machines!',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: () => {
          $('.sup-params').serializeArray().map(x => params[x.name] = x.value)
          return new Promise((resolve, reject) => {
            self.http.post('/api/supervised', params)
              .toPromise()
              .then(response => {
                console.log('right after post request')
                console.log(response)
                json_response = response.json()
                if (json_response.exp_started) {
                  resolve()
                } else {
                  reject(json_response.message)
                }
              })
          })
        }
      }).then(() => {
        console.log('after confirm')
        swal({
          title: 'Running Exps!',
          text: 'Your experiments are starting, redirecting you to the experiment page',
          type: 'success',
          timer: 5000,
          allowOutsideClick: false
        }).then(() => {
          console.log('ok button is clicked');
          let link = ['escher/experiment-detail', json_response.exp_id]
          self.router.navigate(link);
        }, dismiss => {
          if (dismiss == 'timer') {
            console.log('after timer');
            let link = ['escher/experiment-detail', json_response.exp_id];
            self.router.navigate(link);
          }
        }).catch(swal.noop)
      }).catch(swal.noop)

      return false

    })


    // load exp config from local storage
    var local_experiment_config = JSON.parse(localStorage.getItem('supervised_exp_config'));
    if (local_experiment_config) {
      for (var s in local_experiment_config) {
        $('#' + s).val(local_experiment_config[s])
      }
      $('#sup .form-control').each(function () {
        console.log($(this))
        $(this).focus().blur();
      });
    }



  }

  isError(element, message) {
    var el = $(element)
    el.parent().removeClass('has-success').addClass('has-danger');
    el.removeClass('form-control-success').addClass('form-control-danger');
    el.next().text(message).removeClass('text-success').addClass('text-danger');
    el.attr('data-valid', false);
  }

  isSuccess(element, message) {
    var el = $(element);
    el.parent().removeClass('has-danger').addClass('has-success');
    el.removeClass('form-control-danger').addClass('form-control-success');
    el.next().text(message).removeClass('text-danger').addClass('text-success');
    el.attr('data-valid', true);
  }

  resetMessage(element) {
    var el = $(element);
    el.parent().removeClass('has-danger').removeClass('has-success');
    el.removeClass('form-control-danger').removeClass('form-control-success');
    el.next().text('');
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

}
