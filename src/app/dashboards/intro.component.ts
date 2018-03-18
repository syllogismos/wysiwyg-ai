import { Component, OnInit } from '@angular/core';
import { EscherService } from 'app/escher/escher.service';
import { Router } from '@angular/router';

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

  ngOnInit() {
    // console.log(this.escherService['unet'])
  }

  editModel(name): void {
    // console.log()
    localStorage.setItem('localFabricCanvas', this.escherService[name])
    this.router.navigate(['/escher/console'])
    // this.escherService
  }

}
