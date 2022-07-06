import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change just image =>' , this.img);
  };

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/default.png";
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    //before of render
    // NO async -- one time
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //before render
    // change inputs -- some times
    console.log('ngOnchange', 'imgValue => ', this.img);
    console.log('changes', changes);

  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('ngOnInit', 'imgValue => ', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000)
  }

  ngAfterViewInit(): void {
    // after render
    // handle children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // deleted
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn)
  }


  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
