import { Component } from '@angular/core';
import { MovieDetails, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetails[] = [];
  genres: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private dataLocalSrv: DataLocalService, private moviesSrv: MoviesService) { }

  async ionViewWillEnter() {
    this.movies = await this.dataLocalSrv.cargarPeliculasFavoritas();
    this.genres = await this.moviesSrv.setGenres();
    this.pelisPorGenero(this.genres, this.movies);
  }

  pelisPorGenero(generos: Genre[], peliculas: MovieDetails[]) {
    this.favoritoGenero = [],
      generos.forEach(genero => {
        this.favoritoGenero.push({
          genero: genero.name,
          pelis: peliculas.filter(peli => {
            return peli.genres.find(genre => genre.id === genero.id);
          })
        });
      });
  }

}
