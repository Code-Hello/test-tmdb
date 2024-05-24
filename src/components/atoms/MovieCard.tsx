import {
  Card,
  CardBody,
  CardProps,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Movie } from '@/types/movie';

type MovieCardProps = CardProps & {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl =
    movie.poster_path || movie.backdrop_path
      ? `${import.meta.env.VITE_IMAGE_API_BASE_URL}${movie.poster_path ?? movie.backdrop_path}`
      : undefined;

  return (
    <Card w={200} maxH="300px" overflowY="scroll">
      <CardBody p={4}>
        <Stack height="full" gap={3} alignItems="center">
          <Image
            width={150}
            height={150}
            borderRadius="md"
            src={imageUrl}
            alt={`${movie.title} poster`}
            bgColor="gray.100"
          />

          <Stack gap={2} flexGrow={1} justifyContent="space-between">
            <Heading textAlign="center" fontSize="md">
              {movie.title}
            </Heading>
            <Text noOfLines={2} lineHeight={1} fontSize="sm">
              {movie.overview?.length ? movie.overview : 'No description.'}
            </Text>
            <Text textAlign="right" fontSize="sm" as="em">
              {movie.release_date}
            </Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
