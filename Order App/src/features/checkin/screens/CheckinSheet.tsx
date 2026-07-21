import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../store'
import { setGuests, setNote } from '../../../store/slices/tableSlice'
import { setShowCheckin, setLoading } from '../../../store/slices/navigationSlice'

export default function CheckinSheet() {
  const dispatch = useAppDispatch()
  const [guests, setLocalGuests] = useState(2)
  const [note, setLocalNote] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const clamp = (n: number) => Math.max(1, Math.min(20, n))

  const handleStart = () => {
    dispatch(setGuests(guests))
    dispatch(setNote(note))
    dispatch(setShowCheckin(false))
    dispatch(setLoading(true))
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      background: 'rgba(10,4,1,0.55)', backdropFilter: 'blur(3px)',
    }}>
      <div style={{
        width: '100%', maxWidth: 430,
        background: '#fff', borderRadius: '24px 24px 0 0',
        padding: '0 0 40px',
        boxShadow: '0 -16px 64px rgba(0,0,0,0.45)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.44s cubic-bezier(0.32,0.72,0,1)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd' }}/>
        </div>

        {/* Success header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e0f04 0%, #3d2010 100%)',
          margin: '14px 20px', borderRadius: 14,
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 42, height: 42,
            background: 'linear-gradient(135deg, #c9a227 0%, #f0c040 100%)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 3px 12px rgba(240,192,64,0.4)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,192,64,0.55)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Quét thành công</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#f0c040', lineHeight: 1.1 }}>
              Bàn A1 — Khu A
            </div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'rgba(240,192,64,0.4)', letterSpacing: '0.04em' }}>Vị trí</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(240,192,64,0.7)' }}>Tầng 1</div>
          </div>
        </div>

        <div style={{ padding: '4px 20px 0' }}>
          {/* Guest counter */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#6b4020', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
              Số lượng khách tại bàn
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e8d5a0', borderRadius: 12, overflow: 'hidden', background: '#fffbf0' }}>
              <button onClick={() => setLocalGuests(clamp(guests - 1))} style={{
                width: 54, height: 54, border: 'none',
                background: guests <= 1 ? '#f5ead5' : 'linear-gradient(135deg, #e8d590 0%, #f0c040 100%)',
                cursor: guests <= 1 ? 'default' : 'pointer',
                fontSize: 24, color: guests <= 1 ? '#c8b880' : '#1e0f04',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>−</button>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#1e0f04' }}>{guests}</span>
                <span style={{ fontSize: 13, color: '#8a6040', marginLeft: 6 }}>người</span>
              </div>
              <button onClick={() => setLocalGuests(clamp(guests + 1))} style={{
                width: 54, height: 54, border: 'none',
                background: 'linear-gradient(135deg, #c9a227 0%, #f0c040 100%)',
                cursor: 'pointer', fontSize: 24, color: '#1e0f04',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>+</button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {[1,2,3,4,5,6,8,10].map(n => (
                <button key={n} onClick={() => setLocalGuests(n)} style={{
                  padding: '4px 12px', borderRadius: 20,
                  border: guests === n ? '1.5px solid #f0c040' : '1.5px solid #e0cca0',
                  background: guests === n ? 'linear-gradient(135deg, #c9a227, #f0c040)' : 'transparent',
                  color: guests === n ? '#1e0f04' : '#8a6840',
                  fontSize: 13, fontWeight: guests === n ? 700 : 400,
                  cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif",
                }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#6b4020', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
              Ghi chú cho bàn <span style={{ color: '#c8b090', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>(nếu có)</span>
            </label>
            <textarea
              value={note}
              onChange={e => setLocalNote(e.target.value)}
              placeholder="Ví dụ: Không ăn được hải sản, cần ghế trẻ em..."
              rows={3}
              style={{
                width: '100%', padding: '12px 14px',
                border: '2px solid #e8d5a0', borderRadius: 12,
                fontSize: 14, fontFamily: "'Be Vietnam Pro', sans-serif",
                color: '#1e0f04', background: '#fffbf0',
                outline: 'none', resize: 'none', lineHeight: 1.55,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#f0c040' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e8d5a0' }}
            />
          </div>

          <button
            onClick={handleStart}
            style={{
              width: '100%', padding: '17px',
              background: 'linear-gradient(135deg, #b8860b 0%, #d4a820 30%, #f0c040 60%, #d4a820 100%)',
              border: 'none', borderRadius: 14,
              fontSize: 15, fontWeight: 800,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: '#1e0f04', cursor: 'pointer',
              letterSpacing: '0.08em',
              boxShadow: '0 6px 28px rgba(212,168,32,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2h3l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.97-1.67L23 6H5"/>
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            </svg>
            BẮT ĐẦU ĐẶT MÓN
          </button>
        </div>
      </div>
    </div>
  )
}
