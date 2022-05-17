import { useContext } from 'solid-js'
import FlagContext from './FlagContext'

const useUnleashContext = () => {
  const { updateContext } = useContext(FlagContext)

  return updateContext
}

export default useUnleashContext
