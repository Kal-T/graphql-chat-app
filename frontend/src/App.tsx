import { useState } from 'react'
import './App.css'
import { Card, Text } from '@mantine/core'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Card>
        <Text fs="italic">Italic</Text>
      </Card>
    </>
  )
}

export default App
