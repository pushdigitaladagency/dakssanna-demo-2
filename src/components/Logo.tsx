import logoPng from '@/imports/logo dakssnaa final.png';

interface LogoMarkProps {
  height?: number;
  className?: string;
}

export function LogoMark({ height = 44, className = '' }: LogoMarkProps) {
  return (
    <img
      src={logoPng}
      alt="Sree Dakssnaa Aerospace and Defence India Pvt Ltd"
      style={{ height, width: 'auto', display: 'block' }}
      className={className}
      draggable={false}
    />
  );
}

export default LogoMark;
