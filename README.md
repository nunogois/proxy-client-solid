# proxy-client-solid

PoC for a Solid SDK for [Unleash](https://www.getunleash.io/) based on the official [proxy-client-react](https://github.com/Unleash/proxy-client-react).

# DISCLAIMER:

This library is meant to be used with the [unleash-proxy](https://github.com/Unleash/unleash-proxy). The proxy application layer will sit between your unleash instance and your client applications, and provides performance and security benefits. DO NOT TRY to connect this library directly to the unleash instance, as the datasets follow different formats because the proxy only returns evaluated toggle information.

# Installation

```bash
npm install @nunogois/proxy-client-solid
// or
yarn add @nunogois/proxy-client-solid
// or
pnpm i @nunogois/proxy-client-solid
```

# Initialization

Import the provider like this in your entrypoint file (typically index.jsx/tsx):

```jsx
import { FlagProvider } from '@nunogois/proxy-client-solid'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
  environment: 'dev'
}

render(
  () => (
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  ),
  document.getElementById('root') as HTMLElement
)
```

Alternatively, you can pass your own client in to the FlagProvider:

```jsx
import { FlagProvider, UnleashClient } from '@nunogois/proxy-client-solid'

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
  environment: 'dev'
}

const client = new UnleashClient(config)

render(
  () => (
    <FlagProvider unleashClient={client}>
      <App />
    </FlagProvider>
  ),
  document.getElementById('root') as HTMLElement
)
```

## Deferring client start

By default, the Unleash client will start polling the Proxy for toggles immediately when the `FlagProvider` component renders. You can delay the polling by:

- setting the `startClient` prop to `false`
- passing a client instance to the `FlagProvider`

```jsx
render(
  () => (
    <FlagProvider unleashClient={client} startClient={false}>
      <App />
    </FlagProvider>
  ),
  document.getElementById('root') as HTMLElement
)
```

Deferring the client start gives you more fine-grained control over when to start fetching the feature toggle configuration. This could be handy in cases where you need to get some other context data from the server before fetching toggles, for instance.

To start the client, use the client's `start` method. The below snippet of pseudocode will defer polling until the end of the `asyncProcess` function.

```jsx
const client = new UnleashClient({
  /* ... */
})

createEffect(() => {
  const asyncProcess = async () => {
    // do async work ...
    client.start()
  }
  asyncProcess()
})

return (
  // Pass client as `unleashClient` and set `startClient` to `false`
  <FlagProvider unleashClient={client} startClient={false}>
    <App />
  </FlagProvider>
)
```

# Usage

## Check feature toggle status

To check if a feature is enabled:

```jsx
import { useFlag } from '@nunogois/proxy-client-solid'

const TestComponent = () => {
  const enabled = useFlag('travel.landing')

  if (enabled()) {
    return <SomeComponent />
  }
  return <AnotherComponent />
}

export default TestComponent
```

## Check variants

To check variants:

```jsx
import { useVariant } from '@nunogois/proxy-client-solid'

const TestComponent = () => {
  const variant = useVariant('travel.landing')

  if (variant().enabled && variant().name === 'SomeComponent') {
    return <SomeComponent />
  } else if (variant().enabled && variant().name === 'AnotherComponent') {
    return <AnotherComponent />
  }
  return <DefaultComponent />
}

export default TestComponent
```

## Defer rendering until flags fetched

useFlagsStatus retrieves the ready state and error events.
Follow the following steps in order to delay rendering until the flags have been fetched.

```jsx
import { useFlagsStatus } from '@nunogois/proxy-client-solid'

const MyApp = () => {
  const { flagsReady, flagsError } = useFlagsStatus()

  if (!flagsReady()) {
    return <Loading />
  }
  return <MyComponent error={flagsError()} />
}
```

## Updating context

Follow the following steps in order to update the unleash context:

```jsx
import { useUnleashContext, useFlag } from '@nunogois/proxy-client-solid'

const MyComponent = ({ userId }) => {
  const variant = useFlag('my-toggle')
  const updateContext = useUnleashContext()

  createEffect(() => {
    // context is updated with userId
    updateContext({ userId })
  })

  createEffect(() => {
    async function run() {
      // Can wait for the new flags to pull in from the different context
      await updateContext({ userId })
      console.log('new flags loaded for', userId)
    }
    run()
  })
}
```

## Use unleash client directly

```jsx
import { useUnleashContext, useUnleashClient } from '@nunogois/proxy-client-solid'

const MyComponent = ({ userId }) => {
  const client = useUnleashClient();

  const updateContext = useUnleashContext();

  const login = () => {
    // login user
    if (client.isEnabled("new-onboarding")) {
      // Send user to new onboarding flow
    } else (
      // send user to old onboarding flow
    )
  }

  return <LoginForm login={login}/>
}
```
