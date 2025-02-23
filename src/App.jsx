import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'  
import NoteDetail from './pages/NoteDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/note/:id" element={<NoteDetail/>} />
    </Routes>
  )
}

export default App
