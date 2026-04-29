interface AnalogClockProps {
  hour: number;
  minute: number;
  size?: number;
  color?: string;
}

const AnalogClock = ({ hour, minute, size = 400, color = '#1e1b4b' }: AnalogClockProps): JSX.Element => {
  const hourAngle = hour * 30;
  const minuteAngle = minute * 6;

  return (
    <div className="bg-white p-4 rounded-full shadow-xl border-4 border-slate-50 inline-block">
      <svg width={size} height={size} viewBox="0 0 100 100" className="max-w-full h-auto">
        <circle cx="50" cy="50" r="48" fill="white" stroke={color} strokeWidth="2" />
        {[...Array(60)].map((_, i) => {
          const angle = i * 6 * (Math.PI / 180);
          const x1 = 50 + 45 * Math.sin(angle);
          const y1 = 50 - 45 * Math.cos(angle);
          const x2 = 50 + (i % 5 === 0 ? 42 : 44) * Math.sin(angle);
          const y2 = 50 - (i % 5 === 0 ? 42 : 44) * Math.cos(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth={i % 5 === 0 ? '0.8' : '0.4'} />;
        })}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30 * (Math.PI / 180);
          const x = 50 + 36 * Math.sin(angle);
          const y = 50 - 36 * Math.cos(angle);
          return <text key={i} x={x} y={y} fontSize={size > 200 ? '11' : '14'} fontWeight="900" textAnchor="middle" dominantBaseline="middle" fill={color} style={{ fontFamily: "'Borel', cursive" }}>{i + 1}</text>;
        })}
        <line x1="50" y1="50" x2="50" y2="30" stroke={color} strokeWidth="4" strokeLinecap="round" transform={`rotate(${hourAngle} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${minuteAngle} 50 50)`} />
        <circle cx="50" cy="50" r="3" fill={color} />
        <circle cx="50" cy="50" r="1" fill="#ef4444" />
      </svg>
    </div>
  );
};

export default AnalogClock;
