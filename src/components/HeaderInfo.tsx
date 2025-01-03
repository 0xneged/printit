import { usePrivy } from '@privy-io/react-auth'
import FcName from 'components/FcName'
import FcPfp from 'components/FcPfp'
import HatsCounterButton from 'components/HatsCounterButton'
import getUserAddress from 'helpers/getUserAddress'
import { lazy, Suspense } from 'preact/compat'
import { useState } from 'preact/hooks'

const AccountModal = lazy(() => import('components/Modals/AccountModal/index'))

export default function () {
  const { logout, user } = usePrivy()
  const [accountModal, setAccountModal] = useState(false)

  const address = getUserAddress(user)

  return (
    <>
      <div className="flex flex-row gap-x-2">
        <HatsCounterButton />
        <div
          className="flex flex-row items-center gap-x-2 cursor-pointer text-white hover:text-primary-bright transition-colors"
          onClick={() => setAccountModal(true)}
        >
          <FcPfp address={address} />
          <FcName address={address} />
        </div>
      </div>
      {address ? (
        <>
          <Suspense fallback="">
            <AccountModal
              modalOpen={accountModal}
              setModalOpen={setAccountModal}
              address={address}
              logout={logout}
            />
          </Suspense>
        </>
      ) : null}
    </>
  )
}
