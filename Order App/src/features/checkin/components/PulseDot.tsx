interface PulseDotProps {
  color: string
}

export default function PulseDot({ color }: PulseDotProps) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 10, height: 10 }}>
      <span
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          opacity: 0.4,
          animation: 'tabletPulse 1.6s ease-out infinite',
        }}
      />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, position: 'relative' }} />
    </span>
  )
}
