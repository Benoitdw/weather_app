import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Nav, Header,  NextDays, WeatherInfo} from './components';
import ApiProvider from './contexts/ApiProvider';
import MeteoProvider from './contexts/MeteoContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="max-w-md w-full min-h-screen bg-white/30 text-[#303345]">
      <ApiProvider>
      <MeteoProvider>
        <Nav />
        <Header city="Wavre" country="Belgium" />
        <WeatherInfo />
        <NextDays />
      </MeteoProvider>
      </ApiProvider>
    </div>
    </BrowserRouter>
  )
}

export default App
