import ornamentImg from "@/assets/ornament.svg";

interface RotatingOrnamentProps {
  className?: string;
  size?: number;
}

export function RotatingOrnament({ 
  className = "", 
  size = 80 
}: RotatingOrnamentProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={ornamentImg}
        alt="Ornament"
        width={size}
        height={size}
        className="ornament-rotating animate-spin-slow"
        style={{
          filter: "drop-shadow(0 0 10px rgba(216, 180, 105, 0.1))"
        }}
      />
    </div>
  );
}
