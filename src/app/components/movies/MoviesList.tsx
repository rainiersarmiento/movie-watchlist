import { fetchMovieList, fetchDetailedMovieData } from '@/app/lib/data'
import  { MovieElement } from './MovieElement';
import { DetailedMovie } from '@/app/lib/definitions';


export default async function MoviesList({
    title,
    imdbList,
}: {
    title? : string,
    imdbList? : Partial<DetailedMovie>[] | Partial<DetailedMovie>,
}) {
    let movieList: Array<DetailedMovie> | undefined;
    if (title) {
        movieList = await fetchMovieList(title)
    } else if(Array.isArray(imdbList)) {
        movieList = await fetchDetailedMovieData(imdbList);
    } else if(typeof imdbList === 'string') {
        movieList = await fetchDetailedMovieData([imdbList])
    }
    else {
        return null
    }
    const moviesWithPoster = Array.isArray(movieList)
        ? movieList.filter((movie: DetailedMovie) => movie.Poster && movie.Poster !== 'N/A')
        : [];

    const movieElements = moviesWithPoster.map((movie: DetailedMovie) => {
        const {
            Genre,
            imdbID,
            imdbRating,
            Plot,
            Poster,
            Runtime,
            Title,
        } = movie;

        return (
            <div
                key={movie.imdbID}
                className="movie-container"
            >
                <MovieElement
                    Genre={Genre}
                    imdbID={imdbID}
                    imdbRating={imdbRating}
                    Plot={Plot}
                    Poster={Poster}
                    Runtime={Runtime}
                    Title={Title}
                />
            </div>
        );
    });

    return (
        <div className='movie-list-container'>
            {movieList ? movieElements : <h1>Unable to find what you&apos;re looking for. Please try another search.</h1>}
        </div>
    )
}

