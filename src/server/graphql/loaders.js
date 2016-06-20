import { Loader as movies } from './modules/movie'
import { Loader as actors } from './modules/actor'

const rootLoaders = {
  ...actors,
  ...movies
}

export default function loaders () {
  return rootLoaders
}
