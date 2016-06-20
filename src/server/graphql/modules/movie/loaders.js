import DataLoader from 'dataloader'
import Movie from './model'

export default {
  Movie: new DataLoader(uuids => Movie.load(uuids))
}
