import { base } from 'viem/chains'
import { convertTokensHats } from 'helpers/api/token'
import { readContract, writeContract } from '@wagmi/core'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { waitForTransactionReceipt } from '@wagmi/core'
import BigButton from 'components/BigButton'
import CoinToHats from 'components/Convert/CoinToHats'
import EthAddress from 'types/EthAddress'
import ExchangerBlock from 'components/Convert/ExchangerBlock'
import HatsQuantity from 'components/Convert/HatsQuantity'
import Input from 'components/Input'
import bep20abi from 'helpers/bep20abi'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'

const decimals = 18

export default function () {
  const { login, authenticated, ready, connectWallet, user } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  const [loading, setLoading] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [amount, setAmount] = useState(1000)

  const processExchange = useCallback(async () => {
    if (!ready || !walletsReady) return
    if (!authenticated) {
      login()
      return
    }
    const address = user?.wallet?.address
    if (!wallets[0]?.address) {
      connectWallet({ suggestedAddress: address })
    }

    if (!address || amount <= 0 || loading) return

    const convertedAmount = amount * 10 ** decimals

    try {
      setLoading(true)

      await wallets[0].switchChain(base.id)

      if (!isWithdraw) {
        const res = await readContract(walletConfig, {
          address: env.VITE_TOKEN_ADDRESS as EthAddress,
          abi: bep20abi,
          functionName: 'allowance',
          args: [address, env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress],
          chainId: base.id,
        })

        if (Number(res) < convertedAmount) {
          const hash = await writeContract(walletConfig, {
            address: env.VITE_TOKEN_ADDRESS as EthAddress,
            abi: bep20abi,
            functionName: 'increaseAllowance',
            args: [
              env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress,
              BigInt(convertedAmount),
            ],
            chainId: base.id,
          })
          await waitForTransactionReceipt(walletConfig, {
            hash,
            confirmations: 2,
          })
        }
      }

      const res = await convertTokensHats(amount, isWithdraw)
      if (typeof res !== 'number') return

      await queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
      toast.success('Converted 🎉')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong when converting 🧟 Please try again 🥺')
    } finally {
      setLoading(false)
    }
  }, [
    connectWallet,
    ready,
    authenticated,
    amount,
    loading,
    login,
    isWithdraw,
    user?.wallet?.address,
    wallets,
    walletsReady,
  ])

  return (
    <div className="flex flex-col items-center gap-y-7">
      <span>You Convert</span>
      <div className="text-4xl text-primary font-bold">
        <Input
          value={amount}
          onChange={({ currentTarget }) => {
            if (!isWithdraw && currentTarget.valueAsNumber <= 10000)
              setAmount(currentTarget.valueAsNumber)

            if (isWithdraw && currentTarget.valueAsNumber >= 2000)
              setAmount(currentTarget.valueAsNumber)
          }}
          type="number"
          max={isWithdraw ? undefined : 10000}
          min={isWithdraw ? 2000 : 0}
        />
        <span>{isWithdraw ? 'Hats' : 'negeD'}</span>
      </div>
      {isWithdraw ? (
        <span className="font-semibold opacity-70">
          Minimum withdrawal amount is 2000 HATs
        </span>
      ) : null}
      <ExchangerBlock label="You Receive">
        <HatsQuantity quantity={amount} isReversed={isWithdraw} />
      </ExchangerBlock>
      <ExchangerBlock label="Exchange">
        <CoinToHats
          isReversed={isWithdraw}
          onReverse={() => {
            setIsWithdraw((isWithdraw) => {
              isWithdraw ? setAmount(1000) : setAmount(2000)
              return !isWithdraw
            })
          }}
        />
      </ExchangerBlock>
      <BigButton
        onClick={processExchange}
        disabled={!amount}
        loading={loading || !ready || !walletsReady}
      >
        CONVERT
      </BigButton>
    </div>
  )
}
