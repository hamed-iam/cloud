// import "styles/globals.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// import type { AppProps } from "next/app";

// const queryClient = new QueryClient()


// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Component {...pageProps} />
//       <ReactQueryDevtools/>
//     </QueryClientProvider>
//   );
// }


import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetchJson from 'lib/fetchJson'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
