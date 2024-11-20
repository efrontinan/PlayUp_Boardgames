import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import UserMessage from './components/UserMessage/UserMessage'


const App = () => {

  return (
    <div className="App">

      <Navigation />

      <AppRoutes />

      <UserMessage/>

      <Footer />


    </div>
  )
}

export default App


