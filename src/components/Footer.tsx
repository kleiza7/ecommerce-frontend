const Footer = () => {
  return (
    <footer className="border-border-primary bg-surface-primary mt-auto flex justify-center border-t px-6 py-10">
      <span className="text-s14-l20 text-text-muted">
        © {new Date().getFullYear()} ShopLand. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
