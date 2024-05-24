import { Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailsCard from '../molecules/MovieDetailsCard';
import { getMovie } from '@/store/slices/movieSlice';

const Movie = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return;

  const { data, loading } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getMovie(id));
  }, [dispatch]);

  return (
    <Stack p={5} gap={10}>
      <Heading fontSize="2xl">Movie details</Heading>

      <Stack alignItems="center">
        <Skeleton isLoaded={!loading}>
          {data && <MovieDetailsCard movie={data} />}
        </Skeleton>
      </Stack>
    </Stack>
  );
};

export default Movie;
