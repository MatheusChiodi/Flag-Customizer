import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function RoundFlag({
  image,
  arcBackgroundColor,
  text,
  textColor,
}) {
  const [size, setSize] = useState(280);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setSize(width);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const strokeWidth = 25;
  const margin = strokeWidth / 2;
  const center = size / 2;

  const [arcPathState, setArcPathState] = useState("");

  useEffect(() => {
    const arcRadius = center - margin;
    const avgCharWidth = 9;

    let textWidthFactor =
      text.length <= 10 ? text.length : 10 + (text.length - 10) * 0.7;

    const textWidth = textWidthFactor * avgCharWidth * 1.4;
    const arcAngle = textWidth / arcRadius;

    const maxAngle = 240 * (Math.PI / 180);
    const finalArcAngle = Math.min(arcAngle, maxAngle);

    const centerAngleDeg = 135;
    const centerAngleRad = (centerAngleDeg * Math.PI) / 180;
    const halfArcAngle = finalArcAngle / 2;

    const startAngle = centerAngleRad + halfArcAngle;
    const endAngle = centerAngleRad - halfArcAngle;

    const newStartX = center + arcRadius * Math.cos(startAngle);
    const newStartY = center + arcRadius * Math.sin(startAngle);
    const newEndX = center + arcRadius * Math.cos(endAngle);
    const newEndY = center + arcRadius * Math.sin(endAngle);

    const largeArcFlag = finalArcAngle > Math.PI ? 1 : 0;

    setArcPathState(
      `M ${newStartX},${newStartY} A ${arcRadius},${arcRadius} 0 ${largeArcFlag},0 ${newEndX},${newEndY}`,
    );
  }, [center, margin, text]);

  const handleDownload = () => {
    if (containerRef.current === null) return;

    toPng(containerRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "round-flag.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Erro ao gerar imagem:", err);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "relative",
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            className="absolute inset-0 h-full w-full object-cover"
            alt="profile"
          />
          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <path id="arcPath" d={arcPathState} />
            </defs>
            <path
              d={arcPathState}
              fill="none"
              stroke={arcBackgroundColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))",
                transition: "stroke 0.3s ease-in-out",
              }}
            />
            <text fill={textColor} fontSize="20" fontWeight="bold" dy="7">
              <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
                {text}
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-dracula-currentLine hover:bg-dracula-red flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition"
      >
        <Download color="#fff" />
        Baixar imagem
      </button>
    </div>
  );
}
