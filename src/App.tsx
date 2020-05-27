import React, { useState } from 'react';
import logo from './logo.svg';
// import Hello from './component/Hello'
import LikeButton from './component/LikeButton'
// import MouseTricker from './component/MouseTracker'
// import useMousePOsotopn from './hook/useMousePosition'
import useURLLoader from './hook/useURLLoader'
import './App.css';
interface IShowResult {
  message: string
  status: string
}
// 全局主题
interface IThemePeops {
  [key: string]: {
    color: string,
    background: string
  }
}

const themes: IThemePeops = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}
console.log(themes.light, themes.dark)
export const ThemeContext = React.createContext(themes.dark)
console.log(ThemeContext)


function App() {
  const [ show, setShow ] = useState(true)
  // const positions = useMousePOsotopn()
  const [ data, loading ] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const dogResult = data as IShowResult
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>X: { positions.x }, Y: { positions.y}</p> */}
          <LikeButton/>
          {/* <button onClick={() => setShow(!show)}>Toggle Tracker</button> */}
          {/* { show &&  <MouseTricker /> } */}
          {/* { loading ? <p>数据加载中</p>: 
            <img src={dogResult && dogResult.message}></img>
          } */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
