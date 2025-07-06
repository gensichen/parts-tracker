import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PartsTable from './components/screens/PartsTable'
import CreateNewPart from './components/screens/CreateNewPart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EditPart from './components/screens/EditPart'
import Part from './components/screens/Part'


function App() {
  const [parts, setParts] = useState([])

  return (
    <Router>
      <Routes>
        <Route
          path='/parts'
          element={<PartsTable parts={parts} setParts={setParts} />}
        />
        <Route
          path='/parts/create'
          element={<CreateNewPart parts={parts} setParts={setParts} />}
        />
        <Route
          path='/parts/edit/:partNumber'
          element={<EditPart />}
        />
        <Route
          path='/parts/:partNumber'
          element={<Part parts={parts} setParts={setParts}/>}
        />
      </Routes>
    </Router>
  )
}

export default App
