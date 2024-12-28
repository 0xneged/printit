import HatIcon from 'components/icons/HatIcon'
import { AccountModalInner } from 'components/Modals/AccountModal/Props'
import { Button as FlowBiteButton } from 'flowbite-react'
import vibrate from 'helpers/vibrate'
import { useState } from 'preact/hooks'

export default function ({
  logout,
  closeModal,
}: AccountModalInner & {
  closeModal: () => void
}) {
  const [loading, setLoading] = useState(false)

  const LogoutButton = () =>
    FlowBiteButton({
      onClick: async () => {
        vibrate()
        setLoading(true)
        await logout()
        setLoading(false)
        closeModal()
      },
      color: 'red',
      children: 'Logout',
      isProcessing: loading,
      processingSpinner: <HatIcon rotateAnimation />,
    })

  return (
    <>
      <LogoutButton />
    </>
  )
}
