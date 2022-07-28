import { useContext } from 'solid-js'

import FlagContext, { IFlagContextValue } from './FlagContext'

const useFlagsStatus = () => {
  const { flagsReady, flagsError } = useContext<IFlagContextValue>(FlagContext)

  return { flagsReady, flagsError }
}

export default useFlagsStatus
