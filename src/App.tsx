import { RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import {router}  from './router'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={ router }/>
    </div>
  )
}

export default App
