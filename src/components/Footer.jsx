import React from "react";

function Footer() {
  return (
    <footer className="mt-5 rounded-t-lg bg-gray-800 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:gap-0">
        <p className="text-md text-gray-400">
          © 2025 - Todos os direitos reservados
        </p>
        <p className="text-md text-gray-400 mx-3  hidden md:block">|</p>
        <p className="text-md text-gray-400">
          Desenvolvido por
          <a
            href="https://matheuschiodi.github.io/Portfolio/"
            target="_blank"
            className="text-dracula-red hover:text-dracula-red/80 mx-1 font-semibold"
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
