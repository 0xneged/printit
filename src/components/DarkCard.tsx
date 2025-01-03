import HatsBg from 'components/icons/HatsBg'
import { PropsWithChildren } from 'preact/compat'

export const darkCardStyles =
  'relative flex flex-1 flex-row rounded-t-lg bg-roulette-box py-3 overflow-hidden w-full gap-x-2 '

interface DarkCardProps extends PropsWithChildren {
  hasDeposits?: boolean
  extStyle?: string
}

export default function ({ children, hasDeposits, extStyle }: DarkCardProps) {
  const finalStyles = darkCardStyles + extStyle

  return (
    <div className={finalStyles}>
      {hasDeposits ? (
        children
      ) : (
        <>
          {children}
          <div className="absolute flex flex-row -z-1">
            <HatsBg />
            <HatsBg />
          </div>
        </>
      )}
    </div>
  )
}
