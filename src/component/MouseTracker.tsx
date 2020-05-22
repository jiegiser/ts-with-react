import React, { useState, useEffect } from 'react'

const MouseTricker: React.FC = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      console.log('click')
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    console.log('click12312')
    document.addEventListener('click', updateMouse)
    return () => {
      // 在组件卸载的时候执行清除操作
      // 清除上一次effect
      console.log('remove')
      document.removeEventListener('click', updateMouse)
    }
  }, [])
  return (
  <p>X: {position.x}, Y: {position.y}</p>
  )
}
export default MouseTricker