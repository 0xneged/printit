import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { usePrivy } from '@privy-io/react-auth'
import printerTimeoutAtom from 'atoms/printerTimeout'
import Button from 'components/Button'
import DotsLoader from 'components/icons/DotsLoader'
import Stream from 'components/Stream'
import TiltCard from 'components/TiltCard'
import { castPicture, getPictureTimeout } from 'helpers/api/castPicture'
import handleError from 'helpers/handleError'
import useCountDown from 'helpers/hooks/useCountDown'
import useUserBalance from 'helpers/hooks/useUserBalance'
import openSwap from 'helpers/openSwap'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { toast } from 'react-toastify'
import { useFilePicker } from 'use-file-picker'
import {
  FileAmountLimitValidator,
  FileSizeValidator,
  FileTypeValidator,
} from 'use-file-picker/validators'

const textStyle = 'font-bold font-script text-3xl flex flex-col items-center'
const limit = 3000

export default function () {
  const [printerTimeout, setPrinterTimeout] = useAtom(printerTimeoutAtom)
  const { time, formatted } = useCountDown({
    endTime: printerTimeout,
  })
  const [parent] = useAutoAnimate()
  const [castLoading, setCastLoading] = useState(false)
  const { openFilePicker, filesContent, loading, plainFiles, clear } =
    useFilePicker({
      readAs: 'DataURL',
      accept: 'image/*',
      multiple: false,
      validators: [
        new FileAmountLimitValidator({ max: 1 }),
        new FileTypeValidator(['jpg', 'png', 'webp']),
        new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }),
      ],
      onFilesRejected: (data) => {
        data.errors.forEach((e) => {
          if ('reason' in e && e.reason === 'FILE_SIZE_TOO_LARGE') {
            handleError({ e, toastMessage: 'File size must be <5Mb' })
            return
          }
          handleError({ e, toastMessage: 'Failed to load the file :(' })
        })
      },
    })
  const { authenticated, login, ready } = usePrivy()
  const { data, isLoading } = useUserBalance()

  const isEnough = data ? data.value >= limit * data.decimals : false

  useEffect(() => {
    if (!ready) return

    if (!authenticated) {
      setPrinterTimeout(0)
      return
    }

    void getPictureTimeout().then(({ timeout }) => setPrinterTimeout(timeout))
  }, [authenticated, ready, setPrinterTimeout])

  const onCastPicture = useCallback(async () => {
    try {
      setCastLoading(true)
      const { timeout } = await castPicture(plainFiles[0])
      setPrinterTimeout(timeout)
      clear()
      toast.success('Casted! It will be printed soon 👀')
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to cast your pic :(' })
    } finally {
      setCastLoading(false)
    }
  }, [clear, plainFiles, setPrinterTimeout])

  if (!ready)
    return (
      <div className="w-full flex items-center justify-center">
        Preparing paper
        <DotsLoader />
      </div>
    )

  return (
    <div className="h-96 flex flex-row flex-wrap gap-2">
      <TiltCard onClick={login} disabled={authenticated}>
        <span className={textStyle}>
          1. Connect a wallet {authenticated ? '✅' : null}
        </span>
      </TiltCard>

      <TiltCard
        animated
        disabled={!authenticated || isLoading || isEnough}
        onClick={openSwap}
      >
        <span className={textStyle}>
          2. Hold at least 3000 negeD {isEnough ? '✅' : '(click to swap)'}
        </span>
      </TiltCard>

      <TiltCard
        animated
        disabled={!authenticated || !isEnough || !!time}
        onClick={() => !loading && !castLoading && openFilePicker()}
        disableTilt={!!filesContent.length}
      >
        <div className="flex flex-col gap-y-2 h-full" ref={parent}>
          <span className={textStyle}>
            3. Cast a picture {time ? null : '(1 per 24 hours)'}
          </span>

          {time ? (
            <span className="text-center">Timeout: {formatted}</span>
          ) : null}

          {filesContent.map((file, index) => (
            <img
              alt={file.name}
              src={file.content}
              key={index}
              className="max-h-80 max-w-80 self-center"
            />
          ))}
          {filesContent.length ? (
            <Button
              loading={castLoading}
              onClick={(e) => {
                e.stopPropagation()
                void onCastPicture()
              }}
            >
              Cast
            </Button>
          ) : null}
        </div>
      </TiltCard>

      <TiltCard
        animated
        onClick={() => window.open('https://warpcast.com/printit')}
      >
        <span className={textStyle}>4. See who is in the queue 🖨️</span>
      </TiltCard>

      <Stream />
      <div className="w-full h-4" />
    </div>
  )
}
