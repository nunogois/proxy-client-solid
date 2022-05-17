import { useContext } from 'solid-js'
import { UnleashClient } from 'unleash-proxy-client'
import FlagContext from './FlagContext'

const useUnleashClient = (): UnleashClient => {
  const { client } = useContext(FlagContext)
  return client as UnleashClient
}

export default useUnleashClient
