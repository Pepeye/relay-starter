import { Loader as actors } from './modules/actor'
import { Loader as directors } from './modules/director'
import { Loader as movies } from './modules/movie'

const rootLoaders = {
  ...actors,
  ...directors,
  ...movies
}

export default function loaders () {
  return rootLoaders
}
