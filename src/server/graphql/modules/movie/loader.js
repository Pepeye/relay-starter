import DataLoader from 'dataloader'
import Batch from 'batch'

export default function() {
  return {
    Movie: new DataLoader(ids => Batch(ids))
  }
}
