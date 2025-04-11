import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function RoundFlag({
  image,
  arcBackgroundColor,
  text,
  textColor,
}) {
  const { t } = useTranslation();
  const size = 300;
  const containerRef = useRef(null);

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
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          className="absolute inset-0 h-full w-full object-cover shadow-lg"
          alt="profile"
        />
        <div
          className={`py- absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden`}
          style={{
            backgroundColor: arcBackgroundColor,
          }}
        >
          <p
            className="text-[20px]"
            style={{
              color: textColor,
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </p>
        </div>
      </motion.div>
      <button
        onClick={handleDownload}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-dracula-currentLine px-4 py-2 text-white transition hover:bg-dracula-red"
      >
        <Download color="#fff" />
        {t("download")}
      </button>
    </div>
  );
}
