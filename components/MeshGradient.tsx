"use client";

interface MeshGradientProps {
  className?: string;
}

export function MeshGradient({ className = "" }: MeshGradientProps) {
  return (
    <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #FF8B6A 0%, transparent 70%)",
          top: "5%",
          left: "15%",
          animation: "float 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
          top: "40%",
          right: "5%",
          animation: "float 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
          bottom: "10%",
          left: "25%",
          animation: "float 20s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
