import DataLoader from 'dataloader'
import Director from './model'

export default {
  Director: new DataLoader(uuids => Director.load(uuids))
}
