import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PartsTable from './components/screens/PartsTable'
import CreateNewPart from './components/screens/CreateNewPart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  const [parts, setParts] = useState([])

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

    // <PartsTable parts={parts} setParts={setParts}/>

        //     <Router>
        //     <Switch>
        //         <Route exact path='/parts'>
        //             <BookTable parts={parts} setParts={setParts}/>
        //         </Route>
        //         <Route exact path='/parts/create'>
        //             <CreateNewBook parts={parts} setParts={setParts}/>
        //         </Route>
        //         {/* <Route exact path='/books/edit/:isbn'>
        //             <EditBook />
        //         </Route>
        //         <Route exact path='/books/:isbn'>
        //             <Book books={books} setBooks={setBooks}/>
        //         </Route> */}
        //     </Switch>
        // </Router>

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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
