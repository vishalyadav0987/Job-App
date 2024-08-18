import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/theme-utils';
import App from './App.jsx'


const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    }
  })
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const color = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  }
}

const theme = extendTheme({ config, styles, color });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
