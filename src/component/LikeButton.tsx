import React, { useState, useEffect } from 'react'
import useMousePosition from '../hook/useMousePosition'
const LikeButton: React.FC = () => {
  // 函数调用时保存变量的方法，在函数退出后，变量就会消失；跟之前的 state 没有关系
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  const positions = useMousePosition()
  useEffect(() => {
    console.log('123123')
    document.title = `点击了${like} 次`
  }, [like])
  return (
    <>
    {
      // 更新变量总是替换他，所以要把对象中所有的属性都写上
    }
    <button onClick={() => {setLike(like + 1)}}>
      {like} 赞
    </button>
    <button onClick={() => {setOn(!on)}}>
      {on ? 'ON': 'OFF'}
    </button>
    <p>X: { positions.x }, Y: { positions.y}</p>
    </>
  )
}

export default LikeButton