import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() movieId;

  slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  movie: MovieDetails = {};
  actors: Cast[] = [];
  oculto = 150;
  existe: boolean;

  constructor(private moviesSrv: MoviesService, private modalCtrl: ModalController, private dataLocalSrv: DataLocalService) { }

  async ngOnInit() {
    const existeEnLS = await this.dataLocalSrv.existePelicula(this.movieId);

    if (existeEnLS) {
      this.existe = true;
    } else {
      this.existe = false;
    }

    this.moviesSrv.getMovieDetails(this.movieId).subscribe(response => {
      this.movie = response;
    });

    this.moviesSrv.getMovieCast(this.movieId).subscribe(response => {
      this.actors = response.cast;
    });
  }

  onClickVolver() {
    this.modalCtrl.dismiss();
  }

  async onClickFavorito() {
    const existeEnLS = await this.dataLocalSrv.existePelicula(this.movieId);

    if (!existeEnLS) {
      this.existe = true;
    } else {
      this.existe = false;
    }
    this.dataLocalSrv.guardarPeliculaFavorita(this.movie);
  }

}
