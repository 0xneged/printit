import { usePrivy } from '@privy-io/react-auth'
import env from 'helpers/env'
import EthAddress from 'types/EthAddress'
import { useBalance } from 'wagmi'

export default () => {
  const { user } = usePrivy()

  return useBalance({
    token: env.VITE_TOKEN_ADDRESS as EthAddress,
    address: user?.wallet?.address as EthAddress | undefined,
  })
}
