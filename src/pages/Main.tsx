import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import socket from 'helpers/api/socket'
import { useEffect, useState } from 'preact/hooks'
import Round from 'types/Round'
import { useAccount } from 'wagmi'

export default function () {
  const { address } = useAccount()
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const safeDeposits = currentRound?.deposits || []
  const totalDeposits =
    safeDeposits.reduce((prev, { amount }) => prev + amount, 0) || 1

  useEffect(() => {
    socket.on('updateRound', (data: { currentRound: Round }) => {
      console.log(data)
      setCurrentRound(data.currentRound)
    })

    return () => {
      socket.off('updateRound')
    }
  }, [address])

  return (
    <>
      <Roulette deposits={safeDeposits} totalDeposits={totalDeposits} />
      <TotalBets totalDeposits={totalDeposits} />
      <RoundStats round={currentRound} />
      <YourBets deposits={safeDeposits} totalDeposits={totalDeposits} />
    </>
  )
}
