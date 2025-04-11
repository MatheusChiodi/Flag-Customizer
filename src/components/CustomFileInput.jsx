import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function CustomFileInput({ handleFileChange }) {
  const { t } = useTranslation();
  const noImageLabel = useMemo(() => t("CustomFileInput.noImage"), [t]);

  const [fileName, setFileName] = useState(noImageLabel);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setError(t("CustomFileInput.alert"));
      e.target.value = null;
      setFileName(noImageLabel);
      return;
    }

    if (file) {
      setFileName(file.name);
      setError("");
    } else {
      setFileName(noImageLabel);
    }

    handleFileChange(e);
  };

  useEffect(() => {
    setFileName(noImageLabel); // atualiza quando idioma muda
  }, [noImageLabel]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isNoImage = fileName === noImageLabel;

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
        <label className="block w-full sm:w-auto">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={onChange}
            className="hidden"
            id="customFileInput"
          />
          <label
            htmlFor="customFileInput"
            className="block w-full cursor-pointer rounded-md bg-dracula-currentLine px-4 py-2 text-center text-sm text-white transition-all duration-500 hover:bg-dracula-red"
          >
            {isNoImage
              ? t("CustomFileInput.toChoose")
              : t("CustomFileInput.toReplace")}
          </label>
        </label>
        <p className="max-w-full break-all text-sm text-gray-500">{fileName}</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-xs gap-1 rounded-lg bg-dracula-red px-4 py-3 text-center text-sm text-white shadow-xl sm:w-auto"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CustomFileInput;
