import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import MovieList from '@components/molecules/MovieList';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { getMovies } from '@store/slices/moviesSlice';
import { useEffect } from 'react';
import { sortByOptions } from '@/utils/moviesSortByOptions';

const Movies = () => {
  const { data, status, loading } = useAppSelector((state) => state.movies);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!status) {
      void dispatch(getMovies({}));
    }
  }, [status, dispatch]);

  const handleOptionClick = (value: string | undefined) => {
    void dispatch(getMovies({ sortBy: value }));
  };

  return (
    <Stack p={5}>
      <Heading fontSize="2xl">Movies</Heading>

      <Stack alignItems="center">
        <Stack>
          <Menu>
            <MenuButton as={Button} colorScheme="blue" ml="auto">
              Sort
            </MenuButton>

            <MenuList>
              {sortByOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <MovieList movies={data} loading={loading} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Movies;
