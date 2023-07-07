import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'
import { AuthProvider } from '@/components/AuthContext'
import '@/styles/globals.css'
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
import { Provider } from 'react-redux'
import store from '@/store'

const theme = createTheme({
  palette: {
    primary: teal
  }
});

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className={`flex h-screen flex-col items-center ${inter.className}`}>
          <Navbar />

          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
          
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  )
}
