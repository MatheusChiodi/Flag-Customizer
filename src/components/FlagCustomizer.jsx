import { Flag } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function FlagCustomizer({ flagOptions, setFlagOptions }) {
  const MAX_CHARACTERS = 35;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlagOptions({ ...flagOptions, [name]: value });
  };

  const handleTextChange = (e) => {
    let value = e.target.value;
    if (value.length > MAX_CHARACTERS) {
      value = value.slice(0, MAX_CHARACTERS);
    }
    setFlagOptions({ ...flagOptions, text: value });
  };

  return (
    <motion.div
      className="mb-8 rounded-lg bg-gray-800 p-6 text-white shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-dracula-foreground mb-4 flex items-center gap-2 text-2xl font-bold"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Flag color="#ff5555" /> Customizar Flag
      </motion.h2>

      <motion.div
        className="mb-4 flex flex-wrap gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label className="text-dracula-foreground mb-1 block text-lg">
            Cor da Flag:
          </label>
          <input
            type="color"
            name="color"
            value={flagOptions.color}
            onChange={handleChange}
            className="h-10 w-16 rounded border-0"
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label className="text-dracula-foreground mb-1 block text-lg">
            Cor do Texto:
          </label>
          <input
            type="color"
            name="textColor"
            value={flagOptions.textColor}
            onChange={handleChange}
            className="h-10 w-16 rounded border-0"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <label className="text-dracula-foreground mb-1 block text-lg">
          Texto da Flag:
        </label>
        <input
          type="text"
          name="text"
          value={flagOptions.text}
          onChange={handleTextChange}
          maxLength={MAX_CHARACTERS}
          className="focus:ring-dracula-red w-full rounded border p-2 text-gray-900 shadow-lg focus:outline-none focus:ring-2"
        />
      </motion.div>

      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <label className="text-dracula-foreground mb-1 block text-lg">
          Formato da Imagem:
        </label>
        <select
          name="shape"
          value={flagOptions.shape}
          onChange={handleChange}
          className="focus:ring-dracula-red w-full rounded border p-2 text-gray-900 focus:outline-none focus:ring-2"
        >
          <option value="round">Redondo</option>
          <option value="square">Quadrado</option>
        </select>
      </motion.div>
    </motion.div>
  );
}

export default FlagCustomizer;
