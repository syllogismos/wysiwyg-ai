/**
 * @author Batch Themes Ltd.
 * @description We use the approve.js library for form field validation. For additional information and demos go to the following urls:
 * https://github.com/CharlGottschalk/approvejs
 * http://charlgottschalk.co.za/projects/approvejs/demo
 */
import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var approve: any;

@Component({
  selector: 'steps',
  templateUrl: '../forms/steps.html'
})

export class StepsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('[data-approve-field]').on('change', function(e) {
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
    //firstname
    this.validateOnChange('#firstname-0', {
      title: 'First name',
      required: true
    }, 'First name is valid', 'Please enter a valid first name');
    //lastname
    this.validateOnChange('#lastname-0', {
      title: 'Last name',
      required: true
    }, 'Last name is valid', 'Please enter a valid last name');
    //email
    this.validateOnChange('#email-0', {
      title: 'Email',
      required: true,
      email: true
    }, 'Email is valid', 'Please enter a valid email');
    //age
    this.validateOnChange('#age-0', {
      title: 'Age',
      numeric: true
    }, 'Age is valid', 'Please enter a valid age');
    //university name
    this.validateOnChange('#university-name-1', {
      title: 'University name',
      required: true
    }, 'University name is valid', 'Please enter a valid university name');
    //degree level
    this.validateOnChange('#degree-level-1', {
      title: 'Degree level',
      required: true
    }, 'Degree level is valid', 'Please enter a valid degree level');
    //country
    this.validateOnChange('#country-1', {
      title: 'Country',
      required: true
    }, 'Country is valid', 'Please select a country');
    //language
    this.validateOnChange('#language-1', {
      title: 'Language',
      required: true
    }, 'Language is valid', 'Please select a language');
    //company
    this.validateOnChange('#company-name-2', {
      title: 'Company name',
      required: true
    }, 'Company name is valid', 'Please enter a valid company name');
    //position
    this.validateOnChange('#position-2', {
      title: 'Position',
      required: true
    }, 'Position is valid', 'Please enter a valid position');
    //job description
    this.validateOnChange('#job-description-2', {
      title: 'Job description',
      required: true
    }, 'Job description is valid', 'Please enter a valid job description');
    $('.go-back').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('data-target');
      $(target).trigger('click');
      return false;
    });
    $('#step-0').submit(function(e) {
      e.preventDefault();
      var fields = [];
      $('#step-0 .form-control').each(function() {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === "true" ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-0').trigger('click');
        $('#steps .tab-1').addClass('disabled');
        $('#steps .tab-2').addClass('disabled');
        return false;
      }
      $('#steps .tab-1').removeClass('disabled').trigger('click');
      $('#steps .tab-2').addClass('disabled');
      return false;
    });
    $('#step-1').submit(function(e) {
      e.preventDefault();
      var fields = [];
      $('#step-1 .form-control').each(function() {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === "true" ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-1').trigger('click');
        $('#steps .tab-2').addClass('disabled');
        return false;
      }
      $('#steps .tab-2').removeClass('disabled').trigger('click');
      return false;
    });
    $('#step-2').submit(function(e) {
      e.preventDefault();
      var fields = [];
      $('#step-2 .form-control').each(function() {
        $(this).focus().blur();
        fields.push($(this).attr('data-valid') === "true" ? true : false);
      });
      if (fields.includes(false)) {
        $('#steps .tab-2').trigger('click');
        return false;
      }
      console.log('all good');
      return false;
    });

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

  resetMessages(element) {
    var el = $(element);
    el.parent().removeClass('has-danger').removeClass('has-success');
    el.removeClass('form-control-danger').removeClass('form-control-success');
    el.next().text('');
  }

  validateOnChange(element, rules, successMessage, errorMessage) {
    var self = this;
    $(document).on('focus', element, function(e) {
      e.preventDefault();
      //resetMessages(element);
      return false;
    });
    $(document).on('blur', element, function(e) {
      e.preventDefault();
      var result = approve.value($(element).val(), rules);
      if (result.approved) {
        self.isSuccess(element, successMessage);
      } else {
        self.isError(element, errorMessage);
      }
      return false;
    })
  }
}
