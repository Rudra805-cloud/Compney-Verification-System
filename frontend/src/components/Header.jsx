import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`transition-all duration-300 z-50
      ${
        scrolled
          ? "fixed top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-6xl rounded-2xl bg-white/70 backdrop-blur-md shadow-lg"
          : "w-full bg-transparent"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6">
        <h1>CVO</h1>
      </div>
    </nav>
  );
}
export default Navbar