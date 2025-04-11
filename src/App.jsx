import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Header from "./components/Header";
import PhotoUploader from "./components/PhotoUploader";
import FlagCustomizer from "./components/FlagCustomizer";
import Preview from "./components/Preview";
import Footer from "./components/Footer";

function App() {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState(null);
  const [flagOptions, setFlagOptions] = useState({
    color: "#FF5555",
    textColor: "#FFFFFF",
    text: t("yourText"),
    position: "around",
    shape: "round",
  });

  useEffect(() => {
    if (flagOptions.text === "#Seutexto" || flagOptions.text === "#YourText") {
      setFlagOptions((prev) => ({
        ...prev,
        text: t("yourText"),
      }));
    }
  }, [t, flagOptions.text]);

  return (
    <div className="mx-auto flex max-w-[1920px] flex-col justify-between bg-gray-100 px-3 text-gray-900 lg:min-h-screen">
      <Header />
      <div className="h-[95px] w-full"></div>

      <motion.div
        className="mx-auto w-full px-3 pb-3"
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
