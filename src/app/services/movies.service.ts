import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMDB, MovieDetails, ResponseCredits, ResponseSearch, Genre, ResponseGenre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const url = environment.url;
const apiKey = environment.apiKey;
const language = environment.language;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private moviesPage = 0;
  private popularesPage = 0;

  genres: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = url + query;
    query += `&api_key=${apiKey}&language=${language}&include_image_language=${language}`;

    return this.http.get<T>(query);
  }

  getMovies() {
    const hoy = new Date();
    const ultimoDiaMesCurso = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDiaMesCurso}`;

    this.moviesPage++;

    return this.ejecutarQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}&page=${this.moviesPage}`);
  }

  getPopularMovies() {
    this.popularesPage++;
    return this.ejecutarQuery<ResponseMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`);
  }

  getMovieDetails(id: string) {
    return this.ejecutarQuery<MovieDetails>(`/movie/${id}?`);
  }

  getMovieCast(id: string) {
    return this.ejecutarQuery<ResponseCredits>(`/movie/${id}/credits?`);
  }

  searchMovie(name: string) {
    return this.ejecutarQuery<ResponseSearch>(`/search/movie?&query=${name}`);
  }

  setGenres(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery<ResponseGenre>(`/genre/movie/list?`).subscribe(response => {
        this.genres = response.genres;
        resolve(this.genres);
      });
    });
  }
}
