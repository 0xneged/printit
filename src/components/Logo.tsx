import base from 'base'
import HashLink from 'components/HashLink'

export default function () {
  return (
    <HashLink href={base}>
      <p className="font-script text-hat text-3xl hover:hue-rotate-15 transition-all drop-shadow-md">
        negeD Hat
      </p>
    </HashLink>
  )
}
