import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CustomFileInput({ handleFileChange }) {
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem.");
      e.target.value = null;
      setFileName("Nenhum arquivo selecionado");
      return;
    }

    if (file) {
      setFileName(file.name);
      setError("");
    } else {
      setFileName("Nenhum arquivo selecionado");
    }

    handleFileChange(e);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
        <label className="block w-full sm:w-auto">
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            id="customFileInput"
          />
          <label
            htmlFor="customFileInput"
            className="block w-full cursor-pointer rounded-md bg-dracula-currentLine px-4 py-2 text-center text-sm text-white transition-all duration-500 hover:bg-dracula-red"
          >
            {fileName === "Nenhum arquivo selecionado"
              ? "Escolher imagem"
              : "Trocar imagem"}
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
            className="flex gap-1 fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-xs rounded-lg bg-dracula-red px-4 py-3 text-white shadow-xl sm:w-auto text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CustomFileInput;
