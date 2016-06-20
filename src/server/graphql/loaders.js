import { Loader as movies } from './modules/movie'

const rootLoaders = {
  ...movies
}

export default function loaders () {
  return rootLoaders
}
