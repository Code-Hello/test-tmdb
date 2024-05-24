import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Stack,
} from '@chakra-ui/react';
import MovieList from '@components/molecules/MovieList';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { useEffect } from 'react';
import { getLatestMovies } from '@/store/slices/latestMoviesSlice';
import { LatestMoviesPeriod } from '@/utils/latestMoviesPeriod';

const LatestMovies = () => {
  const { data, status, loading } = useAppSelector(
    (state) => state.latestMovies,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!status) {
      void dispatch(getLatestMovies(LatestMoviesPeriod.DAY));
    }
  }, [status, dispatch]);

  const handleTabsChange = (index: number) => {
    const period =
      index === 0
        ? LatestMoviesPeriod.DAY
        : index === 1
          ? LatestMoviesPeriod.WEEK
          : LatestMoviesPeriod.MONTH;

    void dispatch(getLatestMovies(period));
  };

  return (
    <Stack p={5}>
      <Heading fontSize="2xl">Latest</Heading>

      <Tabs
        isLazy
        variant="soft-rounded"
        colorScheme="blue"
        defaultIndex={1}
        onChange={handleTabsChange}
        align="center"
        borderRadius="md"
      >
        <TabList>
          <Tab>Today</Tab>
          <Tab>This week</Tab>
          <Tab>This month</Tab>
        </TabList>

        <TabPanels mt={4} border="1px" borderColor="blue.200" borderRadius="md">
          <TabPanel>{<MovieList movies={data} loading={loading} />}</TabPanel>
          <TabPanel>{<MovieList movies={data} loading={loading} />}</TabPanel>
          <TabPanel>{<MovieList movies={data} loading={loading} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default LatestMovies;
