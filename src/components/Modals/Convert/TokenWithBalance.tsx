import BodyDropdown, {
  BodyDropDownProps,
} from 'components/Modals/Convert/BodyDropdown'
import DotsLoader from 'components/icons/DotsLoader'
import toFixedFloor from 'helpers/numbers/toFixedFloor'

export default function ({
  tokenIndex,
  setTokenIndex,
  isWithdraw,
  balance,
  setMax,
  disabled,
}: BodyDropDownProps & {
  balance?: string | undefined | null
  setMax: (balance: number) => void
}) {
  const opacity = disabled ? 'opacity-80' : 'opacity-100'

  return (
    <div
      class={
        'flex flex-col justify-center items-end gap-y-2 transition-opacity ' +
        opacity
      }
    >
      <div class="flex bg-primary-bright rounded-full">
        <BodyDropdown
          tokenIndex={tokenIndex}
          setTokenIndex={setTokenIndex}
          isWithdraw={isWithdraw}
          disabled={disabled}
        />
      </div>
      <span class="flex flex-col md:flex-row gap-1 text-xs opacity-75">
        <span className="hidden md:block">Balance: </span>
        <span>{balance ? toFixedFloor(balance) : <DotsLoader />}</span>
        {balance ? (
          <button
            className="text-secondary font-bold"
            onClick={() => setMax(Number(toFixedFloor(balance)))}
            disabled={disabled}
          >
            Max
          </button>
        ) : null}
      </span>
    </div>
  )
}