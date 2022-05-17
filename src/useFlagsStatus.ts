import { useContext } from 'solid-js'

import FlagContext from './FlagContext'

const useFlagsStatus = () => {
  const { flagsReady, flagsError } = useContext(FlagContext)

  return { flagsReady, flagsError }
}

export default useFlagsStatus
