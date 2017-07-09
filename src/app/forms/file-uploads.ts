import { Component, OnInit } from '@angular/core';

declare var Dropzone: any;

@Component({
  selector: 'file-uploads',
  templateUrl: '../forms/file-uploads.html'
})

export class FileUploadsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    /*
     * To upload files, open the file-uploads folder and run the following command:
     * php -S localhost:5000
     * This starts a development server with a simple upload script that uploads files to the uploads folder
     **/
    Dropzone.autoDiscover = false;
    const myDropzone = new Dropzone('#my-dropzone', {
      url: 'http://localhost:5000/upload.php',
      dictDefaultMessage: 'Drop your files here to upload'
    });
  }

}
