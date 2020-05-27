## ts-Hooks

### 使用 FunctionComponent 对组件进行类型注解
我们一般写组件的 props 进行类型注解的时候，如下：

```ts
import React from 'react'
interface IHelloProps {
  message?: string
}
const Hello = (props: IHelloProps) => {
  return (
  <h2>{props.message}</h2>
  )
}
export default Hello
```
虽然上面的写法是没有什么问题，但是他缺少了很多代码提示，我们可以使用 react 提供的
functionComponent 来进行注释：
```ts
import React from 'react'
interface IHelloProps {
  message?: string
}
const Hello: React.FunctionComponent<IHelloProps> = (props) => {
  return (
  <h2>{props.message}</h2>
  )
}

Hello.defaultProps = {
  message: "hello"
}
export default Hello
```
上面的代码也可以写成这样：
```ts
import React from 'react'
interface IHelloProps {
  message?: string
}
const Hello: React.FC<IHelloProps> = (props) => {
  return (
  <h2>{props.message}</h2>
  )
}

Hello.defaultProps = {
  message: "hello"
}
export default Hello
```

> 注意后面的泛型是 props 中的数据结构

### useEffect

这个副作用是每次都会执行，页面渲染第一次会执行，以及页面只要有数据更新都会执行；
```ts
  useEffect(() => {
    document.title = `点击了${like} 次`
  })
```
下面的副作用是在页面第一次渲染会执行，然后每次like变量更新，就会执行，第二个数组可以添加多个变量，只要其中一个变化，就会执行
```ts
  useEffect(() => {
    console.log('123123')
    document.title = `点击了${like} 次`
  }, [like])
```
如果只想在页面首次渲染执行一次类似componentDidMounted：第二个参数传一个空数组,
```ts
  useEffect(() => {
    console.log('123123')
    document.title = `点击了${like} 次`
  }, [])
```

### 自定义 hook
必须以 use 开头，两个不同的组件使用同一个 hooks 不会影响里面的 state；
```ts
import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [positions, setPosition] = useState({
    x: 0,
    y: 0
  })
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    document.addEventListener('mousemove', updateMouse)
    return () => {
      // 在组件卸载的时候执行清除操作
      // 清除上一次effect
      document.removeEventListener('mousemove', updateMouse)
    }
  }, [])
  return positions
}

export default useMousePosition
```

### HOC 高阶组件

- 高阶组件就是一个函数，接受一个组件作为参数，返回一个新的组件；
比如我们在发送异步请求的时候，都需要设置 loading，我们可以写一个高阶组件来进行封装：
```ts
import React from 'react'
import axios from 'axios'

interface ILoaderState {
  data: any,
  isLoading: boolean
}
interface ILoaderProps {
  data: any
}

const withLoader = <P extends ILoaderState>(WrappedComponent: any, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false
      }
    }
    componentDidMount() {
      this.setState({
        isLoading: true
      })
      axios.get(url).then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        })
      })
    }
    render() {
      const { data, isLoading } = this.state
      return (
        <>
          {
            (isLoading || !data) ? <p> data is loading </p> : 
            <WrappedComponent {...this.props as P} data={data} />
          }
        </>
      )
    }
  }
}

export default withLoader
```
使用：
```ts
import React, { useState } from 'react';
import withLoader from './component/withLoader'

const DogShow: React.FC<{data: IShowReasult}> = ( { data }) => {
  return (
    <>
      <h2>Gog show: { data.status }</h2>
      <img src={ data.message } alt=""/>
    </>
  )
}
function App() {
  const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  return (
    <div className="App">
      <WrappedDogShow/>
    </div>
  );
}

export default App;
```
使用自定义 hooks 来修改上面的 hoc：

```ts
import { useState, useEffect } from 'react'
import axios from 'axios'


const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then(result => {
      setData(result.data)
      setLoading(false)
    })
  }, deps)
  return [data, loading]
}

export default useURLLoader
```
使用
```ts
import useURLLoader from './hook/useURLLoader'
function App() {
  const [ show, setShow ] = useState(true)
  const [ data, loading ] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const dogResult = data as IShowResult
  return (
        <button onClick={() => setShow(!show)}>Toggle Tracker</button>
        { loading ? <p>数据加载中</p>: 
          <img src={dogResult && dogResult.message}></img>
        }
  )
}
```

### useRef
ref 在渲染中保持着唯一的引用。赋值以及取值拿到的都是唯一的状态，不会在不同的渲染中存在一定的隔离。
修改 ref 的值不会引发组件的重新渲染的。

使用 useRef 在组件更新的时候发生一些操作：
```ts
  const didMoubtRef = useRef(false)
  useEffect(() => {
    if(didMoubtRef.current) {
      console.log('更新')
    } else {
      didMoubtRef.current = true
    }
  })
```

useRef 获取 dom 节点：
```ts
  const domRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if(domRef && domRef.current) {
      domRef.current.focus()
    }
  }, [])
```

### useContext 解决多层传递属性
使用
在根组件中：
```ts
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
export const ThemeContext = React.createContext(themes.dark)
function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <LikeButton/>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
```
在子组件中去接收：
```ts
import React, { useContext } from 'react'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
  const theme = useContext(ThemeContext)
  const style = {
    color: theme.color,
    background: theme.background
  }
    return (
    <>
      <button style={ style } onClick={handleAlertClick}>Alert</button>
    </>
  )
}
```

### Hook 规则

- 只在最顶层使用 Hook
- 只在 React 函数中调用 Hook

> https://usehooks.com/ 网站很多 hooks