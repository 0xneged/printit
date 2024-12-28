import 'index.css'
import 'react-toastify/dist/ReactToastify.css'

import App from 'App'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import { render } from 'preact'

dayjs.extend(objectSupport)

render(<App />, document.getElementById('root') as Element)
