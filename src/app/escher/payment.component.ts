import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Http } from '@angular/http';
// https://github.com/KevinShiCA/ng4-paypal-button/blob/master/src/app/app.component.ts

declare let $: any;
declare let paypal: any;
declare let approve: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {

  private didPaypalScriptLoad: boolean = false;
  private loading: boolean = true;
  paymentHistory: any;
  
  private paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: 'AWOiVbJwfNPPewRCkB3sfbiPQbLAHL6k3AjF_Che6aLLMGAMcxTs-NbyZsO0FB7yrDeWF5GbiwL5HdNx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: $("#paypalAmount").val(), currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      // show success page
      console.log("success payment");
      console.log($("#paypalAmount").val())
      console.log(data)
      console.log(actions)
      return actions.payment.execute().then(payment => {
        console.log("inside payment execute")
        var params = {}
        params['payment'] = JSON.stringify(payment)
        params['amount'] = $("#paypalAmount").val()
        console.log(payment.transactions[0].amount.total)
        this.http.post('/api/record_paypal_payment', params)
          .toPromise()
          .then(response => {
            console.log('right after post request')
            console.log(response)
            this.refreshPaymentHistory()
          })
          .catch(this.handleHttpError)
      })
    },
    validate: (actions) => {
      this.validatePaypalButton(actions)
      $("#paypalAmount").on('input', e => {
        console.log('inside change event handler')
        this.validatePaypalButton(actions);
      })
    },
    onError: (err) => {
      console.log('paypal on error')
      console.log(err)
    },
    onClick: () => {
      console.log("on click paypal")
    }
  };

  validatePaypalButton(actions) {
    console.log('validating papal button')
    var result = approve.value($("#paypalAmount").val(), {
      title: 'paypal amount format',
      required: true,
      currency: true
    })
    if (result.approved) {
      console.log('enabling paypal button action');
      actions.enable();
      this.isSuccess("#paypalAmount", "valid amount")
    } else {
      console.log('disabling paypal button action');
      actions.disable();
      this.isError("#paypalAmount", "invalid currencty amount")
    }
    // if ($("#paypalAmount").val() == '1') {
    //   console.log('enabling');
    //   actions.enable();
    // } else {
    //   console.log('disabling');
    //   actions.disable();
    // }
  }

  ngOnInit() {
    paypal.Button.render(this.paypalConfig, '#paypal-button');

    $("#paypal-button").on('click', e => {
      console.log('paypal button click')
    })

    this.refreshPaymentHistory(true)

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

  refreshPaymentHistory(firstTime: boolean = false): void {
    this.http.post('/api/get_paypal_records', {})
      .toPromise()
      .then(response => {
        this.paymentHistory = response.json().payment_records
        console.log(response.json())
        if (!firstTime) {
          $('#payment-records-datatable').DataTable().destroy();
        }
        setTimeout(function () {
          $(function () {
            $('#payment-records-datatable').DataTable({
              "order": [[1, "desc"]]
            });
          });
        }, 100);
      })
      .catch(this.handleHttpError)

  }

  handleHttpError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(
    private http: Http
  ) { }

}
