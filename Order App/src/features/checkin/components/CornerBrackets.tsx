interface CornerBracketsProps {
  color: string
  glowColor: string
  offset?: number
  size?: number
}

export default function CornerBrackets({ color, glowColor, offset = -10, size = 30 }: CornerBracketsProps) {
  const corners = [
    { top: offset, left: offset, borderTop: true, borderLeft: true },
    { top: offset, right: offset, borderTop: true, borderRight: true },
    { bottom: offset, left: offset, borderBottom: true, borderLeft: true },
    { bottom: offset, right: offset, borderBottom: true, borderRight: true },
  ]

  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            top: 'top' in c ? c.top : undefined,
            bottom: 'bottom' in c ? c.bottom : undefined,
            left: 'left' in c ? c.left : undefined,
            right: 'right' in c ? c.right : undefined,
            borderTop: c.borderTop ? `3.5px solid ${color}` : undefined,
            borderBottom: c.borderBottom ? `3.5px solid ${color}` : undefined,
            borderLeft: c.borderLeft ? `3.5px solid ${color}` : undefined,
            borderRight: c.borderRight ? `3.5px solid ${color}` : undefined,
            borderTopLeftRadius: c.borderTop && c.borderLeft ? 6 : 0,
            borderTopRightRadius: c.borderTop && c.borderRight ? 6 : 0,
            borderBottomLeftRadius: c.borderBottom && c.borderLeft ? 6 : 0,
            borderBottomRightRadius: c.borderBottom && c.borderRight ? 6 : 0,
            boxShadow: `0 0 14px 2px ${glowColor}`,
            transition: 'border-color 0.45s ease, box-shadow 0.45s ease',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}
