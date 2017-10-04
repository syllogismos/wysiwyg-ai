import { Component, OnInit } from '@angular/core';
import { GymEnvsService } from "../services/gym-envs.service";
import { Http } from '@angular/http';

declare var $: any;
declare var typeahead: any;
declare var approve: any;

@Component({
  selector: 'app-escher',
  templateUrl: './escher.component.html',
  styleUrls: ['./escher.component.scss'],
  providers: [GymEnvsService]
})
export class EscherComponent implements OnInit {

  public gymEnvIds: Array<string>;

  constructor(
    private gymEnvsService: GymEnvsService,
    private http: Http
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

    this.validateOnChange('#firstname-0', {
      title: 'First name',
      required: true
    }, 'First name is valid', 'Please enter a valid first name');

    this.validateOnChange('#lastname-0', {
      title: 'Last name',
      required: true
    }, 'Last name is valid', 'Please enter a valid last name');

    this.validateOnChange('#email-0', {
      title: 'Email',
      required: true,
      email: true
    }, 'Email is valid', 'Please enter a valid mail');

    this.validateOnChange('#age-0', {
      title: 'Age',
      numeric: true
    }, 'Age is valid', 'Please enter a valid age');

    this.validateOnChange('#university-name-1', {
      title: 'University name',
      required: true
    }, 'University name is valid', "Please enter a valid university name");

    this.validateOnChange('#degree-level-1', {
      title: 'Degree level',
      required: true
    }, 'Degree level is valid', 'plese enter a vlid degree')

    this.validateOnChange('#country-1', {
      title: 'Country',
      required: true
    }, 'Country is valid', 'Please select a country');

    this.validateOnChange('#language-1', {
      title: 'Language',
      required: true
    }, 'Language is valid', 'Please select a language');

    this.validateOnChange('#company-name-2', {
      title: 'Company name',
      required: true
    }, 'Company name is valid', 'Please enter a valid company name');

    this.validateOnChange('#position-2', {
      title: 'Position',
      required: true
    }, 'Position is valid', 'Please enter a valid position');

    this.validateOnChange('#job-description-2', {
      title: 'Job description',
      required: true
    }, 'Job description is valid', 'Please enter a valid job description');

    this.validateOnChange('#locality-name-3', {
      title: 'Locality name',
      required: true
    }, 'Locality name is valid', 'Please enter a valid locality');

    this.validateOnChange('#state-3', {
      title: 'State name',
      required: true
    }, 'State name is valid', 'Please enter a valid state name');

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
      console.log('sending params to the server');
      var params = {}
      $('.rl-params').serializeArray().map(x => params[x.name] = x.value);
      self.http.post('/api/posttest', params)
        .toPromise()
        .then(response => {
          console.log('right after post test reponse')
        })
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
