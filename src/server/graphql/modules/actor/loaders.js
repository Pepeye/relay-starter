import DataLoader from 'dataloader'
import Actor from './model'

export default {
  Actor: new DataLoader(uuids => Actor.load(uuids))
}
