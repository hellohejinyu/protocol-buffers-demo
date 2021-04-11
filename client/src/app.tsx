import '@/styles/index.css'
import React, { useCallback, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const { bodyProto, defineProto } = require('./proto-helper')

function Home() {
  const socket = useRef<any>()
  useEffect(() => {
    socket.current = io('http://localhost:3000')
    socket.current.on('send', (msg: any) => {
      console.log('===== received =====')
      console.log(msg)
      const res = bodyProto.MatchStock.deserializeBinary(msg)
      console.log(res)
    })
  }, [])
  const send = useCallback(() => {
    const bP = new bodyProto.MatchStock()
    bP.setStocklabel(Math.random().toString())
    bP.setStockname(Math.random().toString())
    console.log('===== send =====')
    console.log(bP)
    const bytes = bP.serializeBinary()
    console.log(bytes)
    socket.current!.emit('msg', bytes)
  }, [])
  return (
    <div>
      <button
        onClick={() => {
          send()
        }}
      >
        send protocol buffers
      </button>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
