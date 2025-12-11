const ProductsFilterSidebar = () => {
  return (
    <div className="text-text-primary space-y-4">
      <h2 className="text-lg font-semibold">Kategori</h2>
      <div className="space-y-1">
        <label className="block">
          <input type="checkbox" /> Sweatshirt
        </label>
        <label className="block">
          <input type="checkbox" /> T-Shirt
        </label>
        <label className="block">
          <input type="checkbox" /> Mont
        </label>
      </div>

      <h2 className="text-lg font-semibold">Marka</h2>
      <input
        type="text"
        placeholder="Marka Ara"
        className="w-full rounded border p-2"
      />

      <h2 className="text-lg font-semibold">Cinsiyet</h2>
      <div className="space-y-1">
        <label className="block">
          <input type="checkbox" /> Erkek
        </label>
        <label className="block">
          <input type="checkbox" /> Kadın
        </label>
      </div>
    </div>
  );
};

export default ProductsFilterSidebar;
