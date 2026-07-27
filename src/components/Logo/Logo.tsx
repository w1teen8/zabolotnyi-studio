import './Logo.css';

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 38 }: LogoProps) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }}>
      <span className="logo-mark__sheen" />
      <svg
        className="logo-mark__glyph"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 5.2 V18.8 M6.5 5.2 A6.8 6.8 0 0 1 6.5 18.8"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.2 6.2 H18.6 L13.2 17.8 H18.6"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
