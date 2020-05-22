import React, { useState } from 'react';
import logo from './logo.svg';
// import Hello from './component/Hello'
import LikeButton from './component/LikeButton'
import MouseTricker from './component/MouseTracker'
// import useMousePOsotopn from './hook/useMousePosition'
import withLoader from './component/withLoader'
import './App.css';

interface IShowReasult {
  message: string
  status: string
}
const DogShow: React.FC<{data: IShowReasult}> = ( { data }) => {
  return (
    <>
      <h2>Gog show: { data.status }</h2>
      <img src={ data.message } alt=""/>
    </>
  )
}
function App() {
  const [ show, setShow ] = useState(true)
  const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  // const positions = useMousePOsotopn()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>X: { positions.x }, Y: { positions.y}</p> */}
        <WrappedDogShow/>
        <LikeButton/>
        <button onClick={() => setShow(!show)}>Toggle Tracker</button>
        { show &&  <MouseTricker /> }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
