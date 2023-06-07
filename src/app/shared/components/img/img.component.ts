import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  img: string = "";
  imageDefault: string = "../../../assets/images/default.png";
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }

  @Input() alt: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imageDefault;
  }
}
