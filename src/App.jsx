import Navigation from './components/Navigation/Navigation'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { MessageProviderWrapper } from './context/userMessage.context'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <MessageProviderWrapper>
        <Navigation />
        <AppRoutes />
      </MessageProviderWrapper>
      <Footer />
    </>
  )
}

export default App

