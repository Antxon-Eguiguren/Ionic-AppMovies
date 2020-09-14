import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 2.5,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async lanzarModalDetalle(movieId: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { movieId }
    });
    await modal.present();
  }

}
