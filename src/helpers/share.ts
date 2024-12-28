import isMobile from 'helpers/isMobile'
import { toast } from 'react-toastify'

export default async function (url: string) {
  if (isMobile) {
    await navigator.share({
      title: 'Look what I printed via warpcast! 🖨️',
      url,
    })
  } else {
    await navigator.clipboard.writeText(url)
    toast.success('Copied 😎')
  }
}
