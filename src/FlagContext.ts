import { Accessor, createContext, Setter } from 'solid-js'
import type { UnleashClient } from 'unleash-proxy-client'

export interface IFlagContextValue
  extends Pick<
    UnleashClient,
    'on' | 'updateContext' | 'isEnabled' | 'getVariant'
  > {
  client?: UnleashClient
  flagsReady: Accessor<boolean>
  setFlagsReady: Setter<IFlagContextValue['flagsReady']>
  flagsError: any
  setFlagsError: Setter<IFlagContextValue['flagsError']>
}

const FlagContext = createContext<IFlagContextValue>(null as never)

export default FlagContext
