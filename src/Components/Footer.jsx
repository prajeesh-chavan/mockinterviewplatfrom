const links = ["Company", "About Us", "Team", "Products", "Blog", "Pricing"];
const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 py-12 w-full glasseffect">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
          {links.map((link, index) => (
            <a
              key={index}
              href="#"
              className="font-medium text-white transition-colors hover:text-gray-500"
              aria-label={link}
            >
              {link}
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm font-normal text-white">
          Copyright &copy; {currentYear} Prajeesh Chavan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
