import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import PhotoUploader from "./components/PhotoUploader";
import FlagCustomizer from "./components/FlagCustomizer";
import Preview from "./components/Preview";
import Footer from "./components/Footer";

function App() {
  const [photo, setPhoto] = useState(null);
  const [flagOptions, setFlagOptions] = useState({
    color: "#FF5555",
    textColor: "#FFFFFF",
    text: "#SeuTexto",
    position: "around",
    shape: "round",
  });

  return (
    <div className="mx-auto max-w-[1920px] bg-gray-100 px-3 text-gray-900 lg:min-h-screen flex flex-col justify-between">
      <Header />
      <div className="h-[95px] w-full"></div>
      
      <motion.div
        className="mx-auto px-3 pb-3 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            className="space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhotoUploader setPhoto={setPhoto} />
            <FlagCustomizer
              flagOptions={flagOptions}
              setFlagOptions={setFlagOptions}
            />
          </motion.div>

          <motion.div
            className="flex"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Preview photo={photo} flagOptions={flagOptions} />
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default App;
