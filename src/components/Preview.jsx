import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoundFlag from "./RoundFlag";
import SquareFlag from "./SquareFlag";

function Preview({ photo, flagOptions }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 py-6 shadow-xl">
      <AnimatePresence mode="wait">
        {photo ? (
          <motion.div
            key="preview"
            className="flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {flagOptions.shape === "round" ? (
              <motion.div
                className="relative flex items-center justify-center overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <RoundFlag
                  image={photo}
                  arcBackgroundColor={flagOptions.color}
                  text={flagOptions.text}
                  textColor={flagOptions.textColor}
                />
              </motion.div>
            ) : (
              <motion.div
                className="relative flex items-center justify-center overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SquareFlag
                  image={photo}
                  arcBackgroundColor={flagOptions.color}
                  text={flagOptions.text}
                  textColor={flagOptions.textColor}
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            className="flex h-[100px] items-center justify-center rounded-lg border-[5px] border-dashed border-gray-500 px-5 text-gray-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg">Carregue uma foto para ver a prévia</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Preview;
