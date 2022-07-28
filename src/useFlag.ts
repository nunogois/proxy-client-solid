import { useContext, createEffect, createSignal } from 'solid-js'
import FlagContext, { IFlagContextValue } from './FlagContext'

const useFlag = (name: string) => {
  const { isEnabled, client } = useContext<IFlagContextValue>(FlagContext)
  const [flag, setFlag] = createSignal(!!isEnabled(name))

  createEffect(() => {
    if (!client) return
    client.on('update', () => {
      const enabled = isEnabled(name)
      if (enabled !== flag()) {
        setFlag(!!enabled)
      }
    })

    client.on('ready', () => {
      const enabled = isEnabled(name)
      setFlag(enabled)
    })
  })

  return flag
}

export default useFlag
