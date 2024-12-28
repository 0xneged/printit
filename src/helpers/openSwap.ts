import env from 'helpers/env'

export default function openSwap() {
  window.open(
    `https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=${env.VITE_TOKEN_ADDRESS}`
  )
}
