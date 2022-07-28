import { createSignal, createEffect, useContext } from 'solid-js'

import FlagContext, { IFlagContextValue } from './FlagContext'

const useVariant = (name: string) => {
  const { getVariant, client } = useContext<IFlagContextValue>(FlagContext)
  const [variant, setVariant] = createSignal(getVariant(name))

  createEffect(() => {
    if (!client) return
    client.on('update', () => {
      const newVariant = getVariant(name)
      if (
        variant().name !== newVariant.name ||
        variant().enabled !== newVariant.enabled
      ) {
        setVariant(newVariant)
      }
    })

    client.on('ready', () => {
      const variant = getVariant(name)
      setVariant(variant)
    })
  })

  return variant
}

export default useVariant
