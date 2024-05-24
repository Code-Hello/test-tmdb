import { SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import MovieCard from '@components/atoms/MovieCard';
import { Movies } from '@/types/movie';

type MovieListProps = {
  movies: Movies;
  loading?: boolean;
};

const MovieList = ({ movies, loading }: MovieListProps) => {
  return (
    <Skeleton isLoaded={!loading}>
      {movies.length ? (
        <SimpleGrid
          gap={4}
          columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
          autoRows="1fr"
          width="fit-content"
        >
          {movies.map((movie) => {
            return <MovieCard key={movie.id} height="100%" movie={movie} />;
          })}
        </SimpleGrid>
      ) : (
        <Stack minH="200px" justifyContent="center" alignItems="center">
          <Text>No latest film found for the period searched ...</Text>
        </Stack>
      )}
    </Skeleton>
  );
};

export default MovieList;
