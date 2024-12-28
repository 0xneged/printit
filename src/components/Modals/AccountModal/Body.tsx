import StyledAddress from 'components/StyledAddress'
import AddressProp from 'types/AddressProp'

function YourAddress({ address }: AddressProp) {
  return <StyledAddress label="Your address" address={address} />
}

export default function BodyContent({ address }: AddressProp) {
  return (
    <div className="flex flex-col w-full gap-y-2 text-white leading-tight">
      <YourAddress address={address} />
    </div>
  )
}
