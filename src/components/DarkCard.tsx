import { PropsWithChildren } from 'preact/compat'
import HatsBg from './icons/HatsBg'

interface DarkCardProps extends PropsWithChildren {
  hasDeposits?: boolean
  extStyle?: string
}

export default function ({ children, hasDeposits }: DarkCardProps) {
  return (
    <div
      className={`relative flex flex-1 flex-row rounded-lg bg-roulette-box py-3 overflow-hidden w-full gap-x-2`}
    >
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