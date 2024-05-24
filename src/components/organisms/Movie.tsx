import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailsCard from '../molecules/MovieDetailsCard';
import MovieList from '../molecules/MovieList';
import { getMovie, getMovieRecommendations } from '@/store/slices/movieSlice';

const Movie = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return;

  const { data, recommendations, loading } = useAppSelector(
    (state) => state.movie,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getMovie(id)).then(
      void dispatch(getMovieRecommendations(id)),
    );
  }, [dispatch, id]);

  return (
    <Stack p={5} gap={10}>
      <Heading fontSize="2xl">Movie details</Heading>

      <Stack alignItems="center">
        <Skeleton isLoaded={!loading}>
          {data && <MovieDetailsCard movie={data} />}
        </Skeleton>

        <Box>
          <Heading fontSize="md" mb={4}>
            Recommendations
          </Heading>

          {recommendations && <MovieList movies={recommendations} />}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Movie;
