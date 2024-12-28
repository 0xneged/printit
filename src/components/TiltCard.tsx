import { PropsWithChildren } from 'preact/compat'
import Tilt from 'react-parallax-tilt'
import { ClassNameProp } from 'types/Props'

interface TiltCardProps extends PropsWithChildren {
  onClick?: () => void
  animated?: boolean
  disabled?: boolean
  glow?: boolean
  disableTilt?: boolean
}

export default function TiltCard({
  onClick,
  children,
  animated,
  disabled,
  glow,
  className,
  disableTilt,
}: TiltCardProps & ClassNameProp) {
  const boxShadow = glow ? 'shadow-card shadow-secondary' : ''
  const border = glow ? 'border-secondary' : 'border-primary-dark '
  const opacity = disabled ? 'opacity-50' : 'opacity-100'
  const animation = animated ? 'bg-scroll' : 'hover:bg-scroll'
  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <Tilt
      className={`${animation} ${opacity} ${cursor} ${boxShadow} rounded-lg border-2 ${border} transition-all w-full min-h-20 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        background: 'url(img/hatsBg.svg)',
        backgroundSize: '120%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat-x',
      }}
      tiltEnable={!disableTilt && !disabled}
      glareEnable={!disableTilt && !disabled}
      glareBorderRadius="0.4rem"
      scale={disableTilt || disabled ? 1 : 1.05}
    >
      <div
        className={`rounded-lg min-h-20 w-full flex justify-center items-center flex-col p-8 ${className}`}
        style={{ transform: 'translateZ(2rem)' }}
        onClick={() => {
          if (disabled) return
          onClick?.()
        }}
      >
        {children}
      </div>
    </Tilt>
  )
}
