import ReactDOM from 'react-dom'
import { AuthProviderWrapper } from './context/auth.context'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'ol/ol.css'
import "./index.css"

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <AuthProviderWrapper>
    <Router>
      <App />
    </Router>
  </AuthProviderWrapper>,
  document.getElementById('root')
)