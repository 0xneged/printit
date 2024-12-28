import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import useUserBalance from 'helpers/hooks/useUserBalance'
import roundNumber from 'helpers/numbers/roundNumber'
import openSwap from 'helpers/openSwap'

export default function HatsCounterButton() {
  const { data, isLoading } = useUserBalance()

  return (
    <Button
      onClick={openSwap}
      styles="rounded-full h-11 !opacity-100"
      disabled={isLoading}
      bgHat
    >
      <HatIcon rotate={isLoading ? 0 : 180} rotateAnimation={isLoading} />{' '}
      {data?.value && roundNumber(Number(data.formatted))}
    </Button>
  )
}
