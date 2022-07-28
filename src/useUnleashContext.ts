import { useContext } from 'solid-js'
import FlagContext, { IFlagContextValue } from './FlagContext'

const useUnleashContext = () => {
  const { updateContext } = useContext<IFlagContextValue>(FlagContext)

  return updateContext
}

export default useUnleashContext
