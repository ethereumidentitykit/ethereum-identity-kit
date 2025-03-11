import './clock.css'

const Clock = ({ height, width, color }: { height: number; width: number; color: string }) => {
  return (
    <div
      className="clock"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderColor: color,
      }}
    >
      <div
        className="clock-hand-minute"
        style={{ height: `${height / 2.4}px`, top: `${height / 10}px`, left: `${width / 2}px`, borderColor: color }}
      ></div>
      <div
        className="clock-hand-hour"
        style={{ height: `${height / 3}px`, top: `${height / 6}px`, left: `${width / 2}px`, borderColor: color }}
      ></div>
      <div className="clock-circle"></div>
    </div>
  )
}

export default Clock
