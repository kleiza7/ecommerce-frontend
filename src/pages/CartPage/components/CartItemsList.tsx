import { useCallback, useMemo } from "react";
import { AddIcon, RemoveIcon, TrashIcon } from "../../../assets/icons";
import { useCartActions } from "../../../hooks/useCartActions";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useProductsNavigation } from "../../../hooks/useProductsNavigation";
import GenericTooltip from "../../../shared/components/GenericTooltip";
import { useCartStore } from "../../../stores/CartStore";

const CartItemsList = () => {
  const { goToProductsPage } = useProductsNavigation();
  const cartItems = useCartStore((state) => state.items);
  const { updateCart, removeFromCart, isLoading } = useCartActions();
  const { data: currencies = [] } = useCurrenciesGetAll();

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }
    return map;
  }, [currencies]);

  const groupedBySeller = useMemo(() => {
    const map = new Map<number, typeof cartItems>();

    cartItems.forEach((item) => {
      const sellerId = item.product.seller.id;
      if (!map.has(sellerId)) {
        map.set(sellerId, []);
      }
      map.get(sellerId)!.push(item);
    });

    return Array.from(map.values()).map((items) => ({
      seller: items[0].product.seller,
      items,
    }));
  }, [cartItems]);

  const onSellerClick = useCallback(
    (sellerId: number) => {
      goToProductsPage({
        sellerIds: [sellerId],
        overrideParams: true,
      });
    },
    [goToProductsPage],
  );

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
      {groupedBySeller.map(({ seller, items }) => (
        <div
          key={seller.id}
          className="border-gray-2 bg-surface-primary flex flex-col rounded-lg border"
        >
          <div className="border-gray-2 flex items-center gap-x-1 border-b p-4">
            <span className="text-s14-l20 font-medium text-[#999999]">
              Seller:
            </span>

            <button
              type="button"
              onClick={() => onSellerClick(seller.id)}
              className="text-s14-l20 text-text-primary hover:text-orange cursor-pointer font-medium hover:underline"
            >
              {seller.name}
            </button>
          </div>

          <div className="flex flex-col px-4">
            {items.map((cartItem, index) => {
              const thumb =
                cartItem.product.images.find((img) => img.isPrimary)
                  ?.thumbUrl || cartItem.product.images[0]?.thumbUrl;

              const isMin = cartItem.quantity <= 1;
              const isMax = cartItem.quantity >= cartItem.product.stockCount;

              return (
                <div
                  key={cartItem.productId}
                  className={`relative py-4 ${index !== items.length - 1 ? "border-gray-2 border-b" : ""}`}
                >
                  <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-6 md:gap-y-0">
                    <div className="bg-gray-4 h-[120px] w-[120px] shrink-0 overflow-hidden rounded">
                      {thumb && (
                        <img
                          src={thumb}
                          alt={cartItem.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col items-center gap-y-2 md:items-start xl:flex-row xl:items-center xl:gap-x-6">
                      <div className="flex min-w-0 flex-1 flex-col items-center gap-1 md:items-start">
                        <span className="text-s16-l24 text-text-primary font-semibold">
                          {cartItem.product.name}
                        </span>

                        <span className="text-s14-l20 text-gray-9">
                          {cartItem.product.description}
                        </span>
                      </div>

                      <div className="border-gray-2 flex w-fit shrink-0 items-center gap-x-3 rounded-full border px-3 py-1.5">
                        <GenericTooltip
                          content={isMin ? "Minimum quantity is 1" : ""}
                        >
                          <button
                            disabled={isLoading || isMin}
                            onClick={() =>
                              updateCart({
                                id: cartItem.id,
                                productId: cartItem.productId,
                                newQuantity: cartItem.quantity - 1,
                              })
                            }
                            className="group cursor-pointer rounded p-1"
                          >
                            <RemoveIcon className="fill-orange group-disabled:fill-gray-1 h-4 w-4" />
                          </button>
                        </GenericTooltip>

                        <div className="bg-orange/10 flex h-6 w-6 items-center justify-center rounded-full">
                          <span className="text-s14-l20 text-orange font-medium">
                            {cartItem.quantity}
                          </span>
                        </div>

                        <GenericTooltip
                          content={
                            isMax
                              ? "You have reached the maximum available stock"
                              : ""
                          }
                        >
                          <button
                            disabled={isLoading || isMax}
                            onClick={() =>
                              updateCart({
                                id: cartItem.id,
                                productId: cartItem.productId,
                                newQuantity: cartItem.quantity + 1,
                              })
                            }
                            className="group cursor-pointer rounded p-1"
                          >
                            <AddIcon className="fill-orange group-disabled:fill-gray-1 h-4 w-4" />
                          </button>
                        </GenericTooltip>
                      </div>
                    </div>

                    <span className="text-orange text-s16-l24 shrink-0 font-semibold">
                      {(cartItem.priceSnapshot * cartItem.quantity).toFixed(2)}{" "}
                      {currencyMap.get(cartItem.currencyId) ?? ""}
                    </span>
                  </div>

                  <GenericTooltip content="Remove item from cart">
                    <button
                      disabled={isLoading}
                      onClick={() =>
                        removeFromCart({
                          id: cartItem.id,
                          productId: cartItem.productId,
                        })
                      }
                      className="absolute top-4 right-0 flex cursor-pointer items-center gap-x-1 disabled:opacity-40"
                    >
                      <TrashIcon className="fill-error-primary h-4 w-4" />
                      <span className="text-s12-l16 text-error-primary font-medium underline">
                        Remove
                      </span>
                    </button>
                  </GenericTooltip>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;
