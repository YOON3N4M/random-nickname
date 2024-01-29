import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
const global = css`
	* {
		@font-face {
			font-family: 'S-CoreDream-3Light';
			src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff')
				format('woff');
			font-weight: normal;
			font-style: normal;
		}
		font-family: 'S-CoreDream-3Light';
	}
`

root.render(
	<ChakraProvider>
		<Global styles={global} />
		<App />
	</ChakraProvider>,
)
