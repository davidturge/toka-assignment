import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Project from './pages/project/Project'
import { WebSocketProvider } from './WebSocketContext'
import Navigation from './components/navigation/Navigation'
import Modal from './components/modals/modal/Modal'
import Snackbar from './components/snackbar/Snackbar'

const App = () => {
  return (
    <WebSocketProvider url="ws://localhost:3000/ws">
      <BrowserRouter>
        <Navigation />
        <Modal/>
        <Snackbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
