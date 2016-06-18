import { Loader as Movie } from './modules/movie'

export const rootLoaders = {
  ...Movie
}

export default function loaders () {
  return rootLoaders
}
