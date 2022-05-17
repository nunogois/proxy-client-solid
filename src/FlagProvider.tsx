import { createSignal, createEffect, createMemo } from 'solid-js'
import type { Component } from 'solid-js'
import FlagContext from './FlagContext'
import { UnleashClient, IConfig, IContext } from 'unleash-proxy-client'

type eventArgs = [Function, any]

interface IFlagProvider {
  config?: IConfig
  unleashClient?: UnleashClient
  startClient?: boolean
}

const FlagProvider: Component<IFlagProvider> = props => {
  const { config, unleashClient, startClient = true } = props
  let client = unleashClient
  const [flagsReady, setFlagsReady] = createSignal(false)
  const [flagsError, setFlagsError] = createSignal(null)

  if (!config && !client) {
    console.warn(
      `You must provide either a config or an unleash client to the flag provider. If you are initializing the client in useEffect, you can avoid this warning by
      checking if the client exists before rendering.`
    )
  }

  if (!client && config) {
    client = new UnleashClient(config)
  }

  client?.on('ready', () => {
    setFlagsReady(true)
  })

  client?.on('error', (e: any) => {
    setFlagsError(e)
  })

  createEffect(() => {
    const shouldStartClient = startClient || !unleashClient
    if (shouldStartClient) {
      client?.start()
    }
  })

  const updateContext = async (context: IContext): Promise<void> => {
    await client?.updateContext(context)
  }

  const isEnabled = (name: string) => {
    return client?.isEnabled(name)
  }

  const getVariant = (name: string) => {
    return client?.getVariant(name)
  }

  const on = (event: string, ...args: eventArgs) => {
    return client?.on(event, ...args)
  }

  const context = createMemo(() => ({
    on,
    updateContext,
    isEnabled,
    getVariant,
    client,
    flagsReady,
    flagsError,
    setFlagsReady,
    setFlagsError
  }))

  return (
    <FlagContext.Provider value={context()}>
      {props.children}
    </FlagContext.Provider>
  )
}

export default FlagProvider
