import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GymEnvsService } from "../services/gym-envs.service";
import { ColorsService } from "../services/colors";
import { Http } from '@angular/http';

declare var $: any;
declare var typeahead: any;
declare var approve: any;
declare var swal: any;
declare var _: any;
declare var toastr: any;

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

  /**
   * Tab 1:
   * Experiment Name: exp            Environment Name: env_name
   * Max Episodes: max_episode       Batch Size(v): batch_size
   * 
   * Tab 2:
   * Algorithm Name: algo_name     Discount(v): discount           Learning Rate(v): learning_rate
   * GAE Lambda(v): gae_lambda     Step Size(v): step_size         Scale Reward(v): scale_reward
   * Replay Pool Size(v): replay_pool_size  QF Learning Rate: qf_learning_rate Policy Batch Size(v): policy_batch_size
   * QF Batch Size(v): qf_batch_size       Seed(v): seed
   * 
   * Tab 3:
   * Policy Hidden Sizes: policy_hidden_sizes  Policy Hidden Nonlinearity: policy_hidden_nonlinearity  Policy Output Nonlinearity: policy_output_nonlinearity
   * QF Hidden Sizes: qf_hidden_sizes      QF Hidden Nonlinearity: qf_hidden_nonlinearity
   * Baseline Hidden sizes: baseline_hidden_sizes
   * 
   * Tab 4:
   * No: Parallel Episode Workers: n_parallel    Machine Type: machine_type
   * Experiment Description: exp_desc
   * 
   * Summary:
   */


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

    var variantRange = {
      expects: [
        'max',
        'min'
      ],
      message: '{title} is a comma seperated values that are between {max} and {min}',
      validate: function (value, pars) {
        var every_char_check = _.every(value, x => _.includes('0123456789.,', x))
        var single_param_check = x => (parseFloat(x) >= pars.min) && (parseFloat(x) <= pars.max)
        if (every_char_check) {
          return _.every(value.split(','), single_param_check)
        } else {
          return false
        }
      }
    }
    approve.addTest(variantRange, 'variantRange')

    var hiddenSizes = {
      expects: [],
      message: '{title} is a valid neural network hidden size config',
      validate: function (value, pars) {
        var every_char_check = _.every(value, x => _.includes('0123456789x', x))
        var single_param_check = x => (parseInt(x) > 0)
        if (every_char_check) {
          if (value.split('x').length < 2) return false
          return _.every(value.split('x'), single_param_check)
        } else {
          return false
        }
      }
    }

    approve.addTest(hiddenSizes, 'hiddenSizes')


    var string_inputs = [
      {
        id: 'exp',
        title: 'Experiment Name',
        success: 'Experiment Name is valid',
        error: 'Please enter valid Experiment Name',
        required: true
      },
      {
        id: 'exp_desc',
        title: 'Experiment Description',
        success: 'Experiment Description is valid',
        error: 'Please enter some description',
        required: true
      },
      {
        id: 'env_name',
        title: 'Environment Name',
        success: 'Selected an Environment',
        error: 'Please select an environment',
        required: true
      },
      {
        id: 'algo_name',
        title: 'Algorithm Name',
        success: 'Selected a valid algorithm',
        error: 'Please select an algorithm',
        required: true
      },
      {
        id: 'machine_type',
        title: 'Machine Type',
        success: 'Selected a valid machine type',
        error: 'Please select a valid machine type',
        required: true
      },
      {
        id: 'policy_hidden_nonlinearity',
        title: 'Policy Hidden Non linearity',
        success: 'Valid non linearity',
        error: 'Please select a valid non linearity',
        required: true
      },
      {
        id: 'policy_output_nonlinearity',
        title: 'Policy output non linearity',
        success: 'Valid non linearity',
        error: 'Please select a valid non linearity',
        required: true
      },
      {
        id: 'qf_hidden_nonlinearity',
        title: 'QF hidden non linearity',
        success: 'Valid non linearity',
        error: 'Please select a valid non linearity',
        required: true
      }
    ]

    var hidden_sizes_inputs = [
      {
        id: 'policy_hidden_sizes',
        title: 'Policy Hidden Sizes',
        success: 'Policy hidden sizes are valid',
        error: 'Enter valid hidden size config, sample config looks like 100x200',
        required: true
      },
      {
        id: 'baseline_hidden_sizes',
        title: 'Baseline Hidden Sizes',
        success: 'Baseline hidden sizes are valid',
        error: 'Enter valid hidden size config, sample config looks like 32x32',
        required: true
      },
      {
        id: 'qf_hidden_sizes',
        title: 'Qf Hidden Sizes',
        success: 'Qf hidden sizes are valid',
        error: 'Enter valid hidden size config, sample config looks like 64x64',
        required: true
      },
    ]

    var numeric_inputs = [
      {
        id: 'max_episode',
        title: 'Max Episode',
        success: 'Max episode is valid',
        error: 'Please enter a valid interger number',
        required: true
      },
      {
        id: 'n_parallel',
        title: 'No of parallel episode workers',
        success: 'Valid parallel workers',
        error: 'Please enter a valid integer number',
        required: true
      }
    ]

    var variant_inputs = [
      {
        id: 'var_batch_size',
        title: 'Batch Size',
        success: 'Valid batch size',
        error: 'Please enter a valid variant, comma seperated list of integers between 10, 1000000',
        max: 1000000,
        min: 10,
        required: true
      },
      {
        id: 'var_discount',
        title: 'Discount',
        success: 'Valid discount',
        error: 'Please enter a valid variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_learning_rate',
        title: 'Learning Rate',
        success: 'Valid learning rate',
        error: 'Please enter a valid variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_gae_lambda',
        title: 'GAE Lambda',
        success: 'Valid gae lambda',
        error: 'Please enter a valid variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_step_size',
        title: 'Step Size',
        success: 'Valid step size',
        error: 'Please enter a valid step size variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_scale_reward',
        title: 'Scale Reward',
        success: 'Valid scale reward',
        error: 'Please enter a valid scale reward variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_replay_pool_size',
        title: 'Replay Pool Size',
        success: 'Valid pool size',
        error: 'Please enter a valid variant, between 10 and 10000000',
        max: 10000000,
        min: 10,
        required: true
      },
      {
        id: 'var_qf_learning_rate',
        title: 'QF Learning Rate',
        success: 'Valid learning rate',
        error: 'Please enter a valid variant, between 0 and 1',
        max: 1.0,
        min: 0.0,
        required: true
      },
      {
        id: 'var_policy_batch_size',
        title: 'Policy Batch Size',
        success: 'Valid policy batch size',
        error: 'Please enter a valid variant, between 10 and 1000000',
        max: 1000000,
        min: 10,
        required: true
      },
      {
        id: 'var_qf_batch_size',
        title: 'QF Batch Size',
        success: 'Valid qf batch size',
        error: 'Please enter a valid variant, between 10 and 1000000',
        max: 1000000,
        min: 10,
        required: true
      },
      {
        id: 'var_seed',
        title: 'Seed',
        success: 'Valid seed',
        error: 'Please enter a valid variant, integer between 1 and 1000000',
        max: 1000000,
        min: 1,
        required: true
      }
    ]

    for (var input of string_inputs) {
      this.validateOnChange('#' + input.id, {
        title: input.title,
        required: input.required
      }, input.success, input.error)
    }

    for (var input of numeric_inputs) {
      this.validateOnChange('#' + input.id, {
        title: input.title,
        required: input.required,
        numeric: true,
      }, input.success, input.error)
    }

    for (var variant of variant_inputs) {
      this.validateOnChange('#' + variant.id, {
        title: variant.title,
        required: variant.required,
        variantRange: {
          min: variant.min,
          max: variant.max
        }
      }, variant.success, variant.error)
    }

    for (var hidden_size_input of hidden_sizes_inputs) {
      this.validateOnChange('#' + hidden_size_input.id, {
        title: hidden_size_input.title,
        required: variant.required,
        hiddenSizes: {}
      }, hidden_size_input.success, hidden_size_input.error)
    }



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
      var params = {}
      $('.rl-params').serializeArray().map(x => params[x.name] = x.value);
      localStorage.setItem('rl_exp_config', JSON.stringify(params))
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

      var variantCount = 1
      $('.variant').each(function () {
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
        text: 'You will be launching machines to train the RL Environment according to the config you provided!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, launch machines!',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: () => {
          $('.rl-params').serializeArray().map(x => params[x.name] = x.value)
          return new Promise((resolve, reject) => {
            self.http.post('/api/new_rl_exp', params)
              .toPromise()
              .then(response => {
                console.log('right after post request')
                console.log(response)
                json_response = response.json()
                console.log(json_response)
                if (json_response) {
                  console.log('resolving')
                  resolve()
                } else {
                  reject(json_response)
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
          let link = ['escher/rl-experiment', json_response.exp_id]
          self.router.navigate(link);
        }, dismiss => {
          if (dismiss == 'timer') {
            console.log('after timer');
            let link = ['escher/rl-experiment', json_response.exp_id];
            self.router.navigate(link);
          }
        }).catch(swal.noop)
      }).catch(swal.noop)

      return false
    })

    setTimeout(function () {
      // timeout before loading presaved config from localStorage, so that
      // env_name list gets populated dynamically
      var local_exp_config = JSON.parse(localStorage.getItem('rl_exp_config'))
      if (local_exp_config) {
        for (var s in local_exp_config) {
          $('#' + s).val(local_exp_config[s])
        }
  
        $('.form-control').each(function () {
          $(this).focus().blur();
        })
      }
    }, 10);
    


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
