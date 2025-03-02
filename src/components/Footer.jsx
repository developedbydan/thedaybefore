import { Globe } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="flex flex-col border-t py-5">
      <div className="flex items-center justify-center gap-2">
        <Globe size={20} />
        <h3 className="  font-Cormorant text-2xl font-bold italic ">
          The Day Before
        </h3>
        <Globe size={20} />
      </div>
    </footer>
  );
};

export default Footer;
