import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ideas: string[] = ['Spiderman', 'Avenger', 'The Lord of the Rings'];
  textoBuscar = '';
  movies: Movie[] = [];
  buscando = false;

  constructor(private moviesSrv: MoviesService, private modalCtrl: ModalController) { }

  buscar(event) {
    if (event.detail.value.length === 0) {
      this.buscando = false;
      this.movies = [];
      return;
    }

    this.buscando = true;

    this.moviesSrv.searchMovie(event.detail.value).subscribe(response => {
      this.movies = response.results;
      this.buscando = false;
    });
  }

  async lanzarModalDetalle(movieId: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { movieId }
    });
    await modal.present();
  }

}
