import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store'
import { goTo, setLoading } from '../../../store/slices/navigationSlice'

export default function LoadingScreen() {
  const dispatch = useAppDispatch()
  const [progress, setProgress] = useState(0)
  const steps = ['Xác minh vị trí bàn...', 'Kiểm tra trạng thái bàn...', 'Tải thực đơn...', 'Sẵn sàng!']
  const [step, setStep] = useState(0)

  useEffect(() => {
    const handleDone = () => {
      dispatch(setLoading(false))
      dispatch(goTo('menu'))
    }

    const intervals = [
      setTimeout(() => { setProgress(35); setStep(1) }, 350),
      setTimeout(() => { setProgress(65); setStep(2) }, 750),
      setTimeout(() => { setProgress(90); setStep(3) }, 1100),
      setTimeout(() => { setProgress(100) }, 1400),
      setTimeout(handleDone, 1600),
    ]
    return () => intervals.forEach(clearTimeout)
  }, [dispatch])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'linear-gradient(160deg, #1e0d04 0%, #2c1608 50%, #1a0902 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Be Vietnam Pro', sans-serif",
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1px solid rgba(240,192,64,0.06)',
            width: 280 + i * 140, height: 280 + i * 140,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}/>
        ))}
      </div>

      {/* Logo */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'linear-gradient(135deg, #b8860b 0%, #f0c040 50%, #c9a227 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 32px rgba(240,192,64,0.35)',
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 38 }}>🌸</span>
      </div>

      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 26, color: '#f0c040', letterSpacing: '0.03em', marginBottom: 6 }}>
        Madame Lân
      </div>
      <div style={{ fontSize: 11, color: 'rgba(240,192,64,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 40 }}>
        Nhà hàng truyền thống
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, marginBottom: 14 }}>
        <div style={{ height: 3, background: 'rgba(240,192,64,0.15)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #c9a227, #f0c040)',
            width: `${progress}%`, transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 8px rgba(240,192,64,0.5)',
          }}/>
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'rgba(240,192,64,0.55)', letterSpacing: '0.04em', height: 20, transition: 'opacity 0.2s' }}>
        {steps[step]}
      </div>
    </div>
  )
}
