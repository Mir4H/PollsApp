import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Poll from './components/Poll'
import PollForm from './components/PollForm'
import ChoiceForm from './components/ChoiceForm'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Poll />} />
          <Route path="/create" element={<PollForm/>} />
          <Route path="/choices/:id/:poll" element={<ChoiceForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
