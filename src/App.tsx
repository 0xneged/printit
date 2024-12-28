import sdk from '@farcaster/frame-sdk'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/Header'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import { useEffect } from 'preact/compat'
import { ToastContainer } from 'react-toastify'
import { base } from 'viem/chains'
import { Route, Router, Switch } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-prose p-4 min-h-[88dvh] text-white">
        <Router hook={useHashLocation}>
          <Switch>
            <Route path="/" component={Main} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
      <ToastContainer
        draggable
        position="bottom-right"
        pauseOnHover
        stacked
        theme="dark"
        closeOnClick
        limit={3}
        newestOnTop
      />
    </>
  )
}

export default function AppWrapped() {
  useEffect(() => {
    void sdk.actions.ready()
  }, [])

  return (
    <PrivyProvider
      config={{
        appearance: {
          logo: 'logo.webp',
          accentColor: '#ab4774',
          landingHeader: "Let's print 📃",
          theme: 'dark',
        },
        supportedChains: [base as never],
        defaultChain: base as never,
        loginMethods: ['wallet'],
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'all',
          },
        },
      }}
      appId={env.VITE_PRIVY_APP_ID}
      clientId={env.DEV ? env.VITE_DEV_CLIENT_ID : env.VITE_PROD_CLIENT_ID}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={walletConfig}>
          <App />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
