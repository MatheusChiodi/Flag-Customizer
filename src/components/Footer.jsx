import React from "react";
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-5 rounded-t-lg bg-gray-800 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:gap-0">
        <p className="text-md text-gray-400">
          © 2025 - {t("Footer.rights")}
        </p>
        <p className="text-md mx-3 hidden text-gray-400 md:block">|</p>
        <p className="text-md text-gray-400">
          {t("Footer.DevelopedBy")}{" "}
          <a
            href="https://matheuschiodi.github.io/Portfolio/"
            target="_blank"
            className="mx-1 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text font-semibold text-transparent hover:text-dracula-red/80"
            rel="noopener noreferrer"
          >
            Matheus Chiodi
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
