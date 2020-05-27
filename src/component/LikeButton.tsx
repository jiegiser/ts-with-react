import React, { useState, useEffect, useRef, useContext } from 'react'
// import useMousePosition from '../hook/useMousePosition'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
  // 函数调用时保存变量的方法，在函数退出后，变量就会消失；跟之前的 state 没有关系
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  const likeRef = useRef(0)
  // const positions = useMousePosition()
  const domRef = useRef<HTMLInputElement>(null)
  const theme = useContext(ThemeContext)
  const style = {
    color: theme.color,
    background: theme.background
  }
  console.log(theme)
  useEffect(() => {
    if(domRef && domRef.current) {
      domRef.current.focus()
    }
  }, [])
  const didMoubtRef = useRef(false)
  useEffect(() => {
    if(didMoubtRef.current) {
      console.log('更新')
    } else {
      didMoubtRef.current = true
    }
  })
  useEffect(() => {
    console.log('123123')
    document.title = `点击了${like} 次`
  }, [like])

  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on' + likeRef.current)
    }, 3000)
  }
  return (
    <>
    <input type="text" ref={ domRef } />
    {
      // 更新变量总是替换他，所以要把对象中所有的属性都写上
    }
    <button style={ style } onClick={() => {setLike(like + 1); likeRef.current ++}}>
      {like} 赞
    </button>

    <button style={ style } onClick={handleAlertClick}>Alert</button>
    {/* <button onClick={() => {setOn(!on)}}>
      {on ? 'ON': 'OFF'}
    </button>
    <p>X: { positions.x }, Y: { positions.y}</p> */}
    </>
  )
}

export default LikeButton