import { useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { useProductsGetById } from "../hooks/useProductsGetById";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data, isLoading } = useProductsGetById(Number(id));

  // TODO: fix this loading state, add skeleton
  if (isLoading || !data) return <div className="p-6">Loading...</div>;

  const images = data.images;

  return (
    <div className="flex gap-8 p-6">
      {/* LEFT IMAGE SECTION */}
      <div className="flex flex-col gap-4">
        {/* MAIN IMAGE WRAPPER */}
        <div
          className="relative h-[500px] w-[400px] cursor-pointer overflow-hidden rounded-xl border"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[activeIndex].largeUrl}
            alt="product"
            className="h-full w-full object-cover"
          />

          {/* LEFT ARROW */}
          {activeIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex - 1);
              }}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
            >
              ←
            </button>
          )}

          {/* RIGHT ARROW */}
          {activeIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex + 1);
              }}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
            >
              →
            </button>
          )}
        </div>

        {/* THUMBNAILS */}
        <div className="mt-2 flex gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-20 w-20 overflow-hidden rounded-lg border ${
                idx === activeIndex ? "border-orange" : "border-gray-300"
              }`}
            >
              <img
                src={img.thumbUrl}
                className="h-full w-full object-cover"
                alt="thumb"
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCT INFO */}
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-text-primary text-2xl font-bold">{data.name}</h1>
        <p className="text-text-primary">{data.description}</p>

        <p className="text-orange text-3xl font-bold">
          {/* TODO: currency ekle */}
          {data.price.toFixed(2)} TL
        </p>

        <div className="mt-4 flex gap-4">
          <button className="border-orange text-orange hover:bg-orange rounded-lg border-2 px-6 py-3 transition hover:text-white">
            Buy Now
          </button>
          <button className="bg-orange hover:bg-orange-dark rounded-lg px-6 py-3 text-white transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((img) => ({
          src: img.largeUrl,
        }))}
        index={activeIndex}
        plugins={[Thumbnails]}
      />
    </div>
  );
};

export default ProductDetailPage;
