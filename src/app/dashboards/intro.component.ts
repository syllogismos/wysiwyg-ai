import { Component, OnInit } from '@angular/core';
import { EscherService } from 'app/escher/escher.service';
import { Router } from '@angular/router';

declare var introJs: any;
declare var $: any;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [EscherService]
})
export class IntroComponent implements OnInit {

  constructor(
    private escherService: EscherService,
    private router: Router
  ) { }

  intro = introJs();

  ngOnInit() {
    this.intro.setOptions({
      steps: [
        {
          element: '#step_walkthrough',
          intro: 'In any page click on walk through to get sample demo',
          position: 'left'
        },
        {
          element: '#step1',
          intro: 'Click here to see sample Neural Networks in the Editor',
          position: 'right'
        },
        {
          element: '#step2',
          intro: 'Click here to check out sample Supervised Learning Experiments',
          position: 'right'
        },
        {
          element: '#step3',
          intro: 'Click here to check out sample Rl Experiment',
          position: 'below'
        }
      ]
    })

    /**
     * Below event handler is needed as for some reason the introjs is not showing number of the step properly
     */
    this.intro.onafterchange(function(targetElement) {
      $(".introjs-helperNumberLayer").css("width", "30px");
      $(".introjs-helperNumberLayer").css("height", "30px");
    });
    if (localStorage.getItem('introFlag') == 'dont_show') {

    } else {
      this.intro.start()
      localStorage.setItem('introFlag', 'dont_show')   
    }
  }

  walkThrough(): void {
    this.intro.setOptions({
      steps: [
        {
          element: '#step1',
          intro: 'Click here to see Neural Network Editor',
          position: 'right'
        },
        {
          element: '#step2',
          intro: 'Click here to check out sample Supervised Learning Experiments',
          position: 'right'
        },
        {
          element: '#step3',
          intro: 'Click here to check out sample Rl Experiment',
          position: 'below'
        }
      ]
    })
    this.intro.start()
  }

  editModel(name): void {
    // console.log()
    localStorage.setItem('localFabricCanvas', this.escherService[name])
    this.router.navigate(['/escher/console'])
    // this.escherService
  }

}
