import { useState, useEffect, useRef } from 'react'

interface ScanLineProps {
  active?: boolean
  success: boolean
}

export default function ScanLine({ active = true, success }: ScanLineProps) {
  const [pos, setPos] = useState(0)
  const dirRef = useRef(1)
  const posRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!active || success) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    const run = () => {
      posRef.current += dirRef.current * 1.3
      if (posRef.current >= 100) {
        posRef.current = 100
        dirRef.current = -1
      }
      if (posRef.current <= 0) {
        posRef.current = 0
        dirRef.current = 1
      }
      setPos(posRef.current)
      rafRef.current = requestAnimationFrame(run)
    }
    rafRef.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, success])

  if (!active) return null

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: `${pos}%`,
      height: 2,
      background: success
        ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.9) 20%, #22c55e 50%, rgba(34,197,94,0.9) 80%, transparent)'
        : 'linear-gradient(90deg, transparent, rgba(240,192,64,0.95) 20%, #f0c040 50%, rgba(240,192,64,0.95) 80%, transparent)',
      boxShadow: success
        ? '0 0 12px 3px rgba(40,200,100,0.6)'
        : '0 0 8px 2px rgba(240,192,64,0.5)',
      transition: 'background 0.3s, box-shadow 0.3s',
      zIndex: 10,
      pointerEvents: 'none',
    }}/>
  )
}
