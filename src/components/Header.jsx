import { useState } from "react";
import { motion } from "framer-motion";
import Contact from "./Contact";

function Header() {
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [contactKey, setContactKey] = useState(Math.random());

  function toggleMenuContact() {
    setIsOpenContact(!isOpenContact);
    setContactKey(Math.random());
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-[1%] top-0 z-50 w-[98%] overflow-hidden"
      >
        <div className="mx-auto rounded-b-2xl border-b border-white/10 bg-gray-800 text-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 md:px-10">
            <div className="flex items-center gap-2">
              <img
                src="./logo.png"
                alt="Logo"
                className="h-10 w-auto rounded-full shadow-lg"
              />
              <h2 className="text-2xl font-semibold">Flag Customizer</h2>
            </div>

            {/* Botão com feedback de clique animado */}
            <motion.button
              onClick={toggleMenuContact}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center rounded-md bg-gray-700 px-4 py-1 font-medium transition-all duration-300 hover:bg-gray-600"
            >
              <span>📞</span> <p className="ml-1 hidden md:block">Contato</p>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {isOpenContact && (
        <div
          key={contactKey}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <Contact setIsOpenContact={setIsOpenContact} />
        </div>
      )}
    </>
  );
}

export default Header;
