import { useContext } from 'solid-js'
import { UnleashClient } from 'unleash-proxy-client'
import FlagContext, { IFlagContextValue } from './FlagContext'

const useUnleashClient = (): UnleashClient => {
  const { client } = useContext<IFlagContextValue>(FlagContext)
  return client as UnleashClient
}

export default useUnleashClient
