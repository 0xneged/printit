import Triangle from 'components/Triangle'
import RouletteParticipant from './RouletteParticipant'
import Round, { Deposit } from 'types/Round'
import repeatArray from 'helpers/repeatArray'
import { useEffect, useRef, useState } from 'preact/hooks'
import { darkCardStyles } from 'components/DarkCard'
import getPercentFromTotal from 'helpers/getPercentFromTotal'

type DepositWithChance = Deposit & { winChance: number }

const participantBoxWidth = 136
const gapX = 4
const multiplier = 25

export default function ({
  round,
  totalDeposits,
}: {
  round: Round
  totalDeposits: number
}) {
  const parentBox = useRef<HTMLDivElement>(null)
  const spinBox = useRef<HTMLDivElement>(null)

  const { winner, deposits } = round
  const depositsWithChances = deposits.map((val) => ({
    ...val,
    winChance: getPercentFromTotal(val.amount, totalDeposits),
  }))
  const spinArray = repeatArray<DepositWithChance>(
    depositsWithChances,
    multiplier * 1.2
  )

  useEffect(() => {
    if (!winner || !parentBox.current || !spinBox.current) return
    const indexSpinTo =
      spinArray.findLastIndex(({ address }) => address === winner.address) -
      deposits.length * 2

    const wrapperMiddle = parentBox.current.getBoundingClientRect().width / 2

    const offset = indexSpinTo * (participantBoxWidth + gapX) - wrapperMiddle
    spinBox.current.style.transform = `translateX(${-Math.abs(offset)}px)`
  }, [winner, parentBox, spinArray, deposits])

  return (
    <div className={darkCardStyles} ref={parentBox}>
      <Triangle />
      <div
        className={`flex flex-1 flex-row reveal-winner gap-x-${gapX / 4}`}
        ref={spinBox}
      >
        {spinArray.map(
          ({ address, amount, fcPfpLink, fcUsername, winChance }, index) => (
            <RouletteParticipant
              fcPfpLink={fcPfpLink}
              fcUsername={fcUsername}
              address={address}
              amount={amount}
              key={address + index}
              width={participantBoxWidth}
              winChance={winChance}
            />
          )
        )}
      </div>
    </div>
  )
}
