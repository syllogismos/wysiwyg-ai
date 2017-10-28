import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GymEnvsService } from "../services/gym-envs.service";
import { ColorsService } from "../services/colors";
import { Http } from '@angular/http';

declare var $: any;
declare var typeahead: any;
declare var approve: any;
declare var swal: any;

@Component({
  selector: 'app-escher',
  templateUrl: './rl.component.html',
  styleUrls: ['./rl.component.scss'],
  providers: [GymEnvsService, ColorsService]
})
export class RlComponent implements OnInit {

  public gymEnvIds: Array<string>;

  constructor(
    private gymEnvsService: GymEnvsService,
    private http: Http,
    private router: Router
  ) { }

  
  ngOnInit() {
    this.gymEnvIds = this.gymEnvsService.getGymEnvIds();

    $('.gym-env-ids-input').typeahead({
      source: this.gymEnvIds
    });

    $('[data-approve-field]').on('change', function (e) {
      var field = $(this).attr('data-approve-field');
      var title = $(this).attr('data-approve-title');
      var required = $(this).attr('data-approve-required') === 'true' ? true : false;
      var success = $(this).attr('data-approve-success');
      var error = $(this).attr('data-approve-error');
      var target = $(this).attr('data-approve-target');

      this.validateOnChange('[data-approve-field="' + field + '"]', {
        title: title,
        required: required
      }, success, error);
      console.log(field, title, required, success, error, target);
    });

    var numericRange = {
      expects: [
        'max',
        'min'
      ],
      message: '{title} must be between {max} and {min}',
      validate: function (value, pars) {
        return (parseFloat(value) >= pars.min) && (parseFloat(value) <= pars.max);
      }
    };    
    approve.addTest(numericRange, 'numericRange')

    this.validateOnChange('#env-name-0', {
      title: 'Environment Name',
      required: true
    }, 'Environment Name is valid', 'Please select an Environment');

    this.validateOnChange('#exp-name-0', {
      title: 'Experiment name',
      required: true
    }, 'Experiment Name is valid', 'Please enter a valid Experiment name');

    this.validateOnChange('#save-freq-0', {
      title: 'Save Frequency',
      required: true,
      numeric: true
    }, 'Save Frequency is valid', 'Please enter a valid Save Frequency');

    this.validateOnChange('#max-episodes-0', {
      title: 'Max Episode',
      numericRange: {
        min: 10,
        max: 1000000000
      },
      required: true,
    }, 'No of episodes to run the experiment', 'Please enter a number between 10-1000000000');

    this.validateOnChange('#algo-name-1', {
      title: 'Algorithm name',
      required: true
    }, 'Algorithm name is valid', "Please select the Algorithm");

    this.validateOnChange('#base-learning-rate-1', {
      title: 'Base Learning Rate',
      required: true,
      numericRange: {
        min: 0,
        max: 1
      }
    }, 'Base Learning Rate is valid', 'Please enter a number in range (0, 1)')

    this.validateOnChange('#max-kl-1', {
      title: 'Max KL',
      required: true,
      numericRange:
      {
        min: 0,
        max: 1
      }
    }, 'Max KL is valid', 'Please enter a number in range (0, 1)');

    this.validateOnChange('#gae-lambda-1', {
      title: 'GAE Lambda',
      required: true,
      numericRange: {
        min: 0,
        max: 1
      }
    }, 'GAE Lambda is valid', 'Please select a number in range (0, 1)');

    this.validateOnChange('#scale-reward-1', {
      title: 'Scale Reward',
      required: true,
      numericRange:{
      min: 0,
      max: 1}
    }, 'Scale reward is valid', 'Please enter a number in range (0, 1)');

    this.validateOnChange('#replay-pool-size-1', {
      title: 'Replay Pool Size',
      required: true,
      numericRange: {
        min: 5000, max: 100000000
      }
    }, 'Replay Pool size is valid', 'Please enter a number greater than 5000');

    this.validateOnChange('#policy-hidden-sizes-2', {
      title: 'Policy Hidden sizes',
      required: true
    }, 'Policy hidden sizes are valid', 'Please enter valid value for policy hidden sizes');

    this.validateOnChange('#policy-hidden-non-linearity-2', {
      title: 'Policy Hidden Non Linearity',
      required: true
    }, 'Policy hidden non linearity is valid', 'Enter a valid non linearity');

    this.validateOnChange('#baseline-hidden-sizes-2', {
      title: 'Baseline Hidden sizes',
      required: true
    }, 'Baseline Hidden sizes are valid', 'Please enter a valid value for baseline hidden sizes');

    this.validateOnChange('#baseline-hidden-non-linearity-2', {
      title: 'Baseline Hidden Non Linearity',
      required: true
    }, 'Baseline Hidden non linearity is valid', 'Please enter a valid non linearity');

    this.validateOnChange('#n-parallel-3', {
      title: 'Number of parallel episode workers',
      required: true,
      numericRange: {
        min: 1,
        max: 64
      }
    }, 'Number of parallel workers is valid', 'Please enter a valid number between 1-64')

    this.validateOnChange('#batch-sampler-3', {
      title: 'Batch sampler',
      required: true,
    }, 'Batch sampler value is valid', 'Please select a valid option')

    this.validateOnChange('#machine-type-3', {
      title: 'Machine Type',
      required: true,
    }, 'Selected a valid machine type', 'Please select a valid machine type')

    this.validateOnChange('#variants-description-3', {
      title: 'Variants Description',
      required: true,
    }, 'Valid variants description', 'Please enter a valid variant description')


    $('.go-back').on('click', function (e) {
      e.preventDefault();
      var target = $(this).attr('data-target');
      $(target).trigger('click');
      return false;
    });

    $('#step-0').submit(function (e) {
      e.preventDefault();
      var fields = [];
      $('#step-0 .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === 'true' ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-0').trigger('click');
        $('#steps .tab-1').addClass('disabled');
        $('#steps .tab-2').addClass('disabled');
        $('#steps .tab-3').addClass('disabled');
        return false;
      }
      $('#steps .tab-1').removeClass('disabled').trigger('click');
      $('#steps .tab-2').addClass('disabled');
      $('#steps .tab-3').addClass('disabled');
      return false;
    })

    $('#step-1').submit(function (e) {
      e.preventDefault();
      var fields = [];
      $('#step-1 .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === 'true' ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-1').trigger('click');
        $('#steps .tab-2').addClass('disabled');
        $('#steps .tab-3').addClass('disabled');
        return false;
      }
      $('#steps .tab-2').removeClass('disabled').trigger('click');
      $('#steps .tab-3').addClass('disabled').trigger('click');
      return false
    });

    $('#step-2').submit(function (e) {
      e.preventDefault();
      var fields = []
      $('#step-2 .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === "true" ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-2').trigger('click');
        $('#steps .tab-3').addClass('disabled');
        return false;
      }
      $('#steps .tab-3').removeClass('disabled').trigger('click');
      return false;
    });

    var self = this;

    $('#step-3').submit(function (e) {
      e.preventDefault();
      var fields = []
      $('#step-3 .form-control').each(function () {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === "true" ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-3').trigger('click');
        return false
      }

      swal({
        title: 'Are you sure?',
        text: "You will be launching machines to train the RL environment according to the config you provided!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, launch machines!'
      }).then(() => {
        console.log('sending params to the server');
        var params = {}
        $('.rl-params').serializeArray().map(x => params[x.name] = x.value);
        self.http.post('/api/posttest', params)
          .toPromise()
          .then(resonse => {
            console.log('right after post test response')
          });
        swal({
          title: 'Running Exps!',
          text: 'Your experiment are starting, redirecting you to the experiment page!',
          type: 'success',
          timer: 5000
        }).then(() => {
          console.log('ok button is clicked');
          let link = ['escher/experiment'];
          self.router.navigate(link);
          }, dismiss => {
            if (dismiss == 'timer') {
              console.log('after timer');
              let link = ['escher/experiment'];
              self.router.navigate(link);
            }
          }).catch(swal.noop)
      }).catch(swal.noop)
      
      return false
    })


  }




  isError(element, message) {
    var el = $(element);
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
  }
}
