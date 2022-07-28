export type {
  IConfig,
  IContext,
  IMutableContext,
  IVariant,
  IToggle
} from 'unleash-proxy-client'
export {
  UnleashClient,
  LocalStorageProvider,
  InMemoryStorageProvider
} from 'unleash-proxy-client'
export type { IStorageProvider } from 'unleash-proxy-client'

import FlagContext from './FlagContext'
import FlagProvider from './FlagProvider'
import useFlag from './useFlag'
import useFlagsStatus from './useFlagsStatus'
import useVariant from './useVariant'
import useUnleashContext from './useUnleashContext'
import useUnleashClient from './useUnleashClient'

export {
  FlagContext,
  FlagProvider,
  useFlag,
  useFlagsStatus,
  useVariant,
  useUnleashContext,
  useUnleashClient
}
