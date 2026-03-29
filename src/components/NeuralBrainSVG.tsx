const NeuralBrainSVG = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`w-full h-full ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Brain outline */}
    <ellipse cx="100" cy="95" rx="65" ry="70" stroke="#00F0FF" strokeWidth="1.5" opacity="0.3" />
    <ellipse cx="85" cy="85" rx="40" ry="50" stroke="#A259FF" strokeWidth="1" opacity="0.2" />
    <ellipse cx="115" cy="85" rx="40" ry="50" stroke="#A259FF" strokeWidth="1" opacity="0.2" />

    {/* Neural nodes */}
    {[
      [70, 60], [100, 45], [130, 60], [60, 90], [85, 80], [115, 80], [140, 90],
      [70, 110], [100, 100], [130, 110], [85, 130], [115, 130], [100, 75],
      [75, 75], [125, 75], [90, 55], [110, 55], [100, 120],
    ].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="3" fill="#00F0FF" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur={`${2 + (i % 3)}s`}
            repeatCount="indefinite"
            begin={`${i * 0.2}s`}
          />
        </circle>
        <circle cx={cx} cy={cy} r="6" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.2">
          <animate
            attributeName="r"
            values="4;8;4"
            dur={`${2 + (i % 3)}s`}
            repeatCount="indefinite"
            begin={`${i * 0.2}s`}
          />
        </circle>
      </g>
    ))}

    {/* Neural connections */}
    {[
      [70, 60, 100, 45], [100, 45, 130, 60], [60, 90, 85, 80], [85, 80, 115, 80],
      [115, 80, 140, 90], [70, 110, 100, 100], [100, 100, 130, 110],
      [85, 130, 100, 120], [115, 130, 100, 120], [100, 75, 85, 80],
      [100, 75, 115, 80], [75, 75, 85, 80], [125, 75, 115, 80],
      [70, 60, 60, 90], [130, 60, 140, 90], [100, 100, 100, 120],
      [90, 55, 100, 45], [110, 55, 100, 45], [90, 55, 75, 75], [110, 55, 125, 75],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#A259FF"
        strokeWidth="0.8"
        opacity="0.3"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;8"
          dur={`${1.5 + (i % 2)}s`}
          repeatCount="indefinite"
        />
      </line>
    ))}

    {/* Bottom stem */}
    <line x1="100" y1="140" x2="100" y2="175" stroke="#00F0FF" strokeWidth="1.5" opacity="0.4" />
    <circle cx="100" cy="175" r="4" fill="#FF3EB5" opacity="0.6">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default NeuralBrainSVG;
