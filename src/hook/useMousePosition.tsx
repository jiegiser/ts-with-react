import { useState, useEffect } from 'react'

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
    console.log('mousemove')
    document.addEventListener('mousemove', updateMouse)
    return () => {
      // 在组件卸载的时候执行清除操作
      // 清除上一次effect
      console.log('remove')
      document.removeEventListener('mousemove', updateMouse)
    }
  }, [])
  return positions
}

export default useMousePosition