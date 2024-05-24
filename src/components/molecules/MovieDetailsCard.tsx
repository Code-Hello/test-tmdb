import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Movie } from '@/types/movie';

type MovieDetailsCardProps = {
  movie: Movie;
};

const MovieDetailsCard = ({ movie }: MovieDetailsCardProps) => {
  const imageUrl =
    movie.poster_path ?? movie.backdrop_path
      ? `${import.meta.env.VITE_IMAGE_API_BASE_URL}${movie.poster_path ?? movie.backdrop_path}`
      : undefined;

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      width={{ base: 'full', xs: '75%' }}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={imageUrl}
        alt="Movie poster"
      />

      <Stack>
        <CardBody>
          <Stack height="full" justifyContent="space-between">
            <Heading size="md">{movie.title}</Heading>

            <Text>
              {movie.overview?.length ? movie.overview : 'No description.'}
            </Text>

            <Text textAlign="end">{movie.release_date}</Text>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default MovieDetailsCard;
