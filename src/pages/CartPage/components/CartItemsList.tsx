import { useCallback, useMemo } from "react";
import {
  AddIcon,
  RemoveIcon,
  StoreFrontIcon,
  TrashIcon,
} from "../../../assets/icons";
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
          className="bg-surface-primary flex flex-col gap-y-2"
        >
          <div className="border-border-secondary bg-surface-muted flex items-center gap-x-3 rounded-lg border px-5 py-3.5">
            <StoreFrontIcon className="fill-text-disabled h-5 w-5" />

            <div className="flex items-center gap-x-1">
              <span className="text-s14-l20 text-text-primary font-medium">
                SOLD BY
              </span>

              <button
                type="button"
                onClick={() => onSellerClick(seller.id)}
                className="text-s14-l20 text-primary cursor-pointer font-medium hover:underline"
              >
                {seller.name}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            {items.map((cartItem, index) => {
              const thumb =
                cartItem.product.images.find((img) => img.isPrimary)
                  ?.thumbUrl || cartItem.product.images[0]?.thumbUrl;

              const isMin = cartItem.quantity <= 1;
              const isMax = cartItem.quantity >= cartItem.product.stockCount;

              return (
                <>
                  <div key={cartItem.productId} className="flex gap-x-8 p-4">
                    <div className="border-border-secondary h-[180px] w-[180px] shrink-0 overflow-hidden rounded border p-2">
                      {thumb && (
                        <img
                          src={thumb}
                          alt={cartItem.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 gap-x-9">
                      <div className="flex flex-col justify-between">
                        <div className="flex min-w-0 flex-1 flex-col items-center gap-1 md:items-start">
                          <span className="text-s20-l28 text-text-primary font-semibold">
                            {cartItem.product.name}
                          </span>

                          <span className="text-s14-l20 text-text-muted">
                            {cartItem.product.description}
                          </span>
                        </div>

                        <div className="flex items-center gap-x-6">
                          <div className="border-border-primary flex h-8 w-fit shrink-0 items-center rounded-md border">
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
                                className="group flex h-full w-10 cursor-pointer items-center justify-center"
                              >
                                <RemoveIcon className="fill-text-secondary group-disabled:fill-text-disabled h-4 w-4" />
                              </button>
                            </GenericTooltip>

                            <div className="flex h-full w-10 items-center justify-center">
                              <span className="text-s14-l20 text-text-primary font-medium">
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
                                className="group flex h-full w-10 cursor-pointer items-center justify-center"
                              >
                                <AddIcon className="fill-text-secondary group-disabled:fill-text-disabled h-4 w-4" />
                              </button>
                            </GenericTooltip>
                          </div>

                          <div className="bg-border-primary h-6 w-px" />

                          <GenericTooltip content="Remove item from cart">
                            <button
                              disabled={isLoading}
                              onClick={() =>
                                removeFromCart({
                                  id: cartItem.id,
                                  productId: cartItem.productId,
                                })
                              }
                              className="flex cursor-pointer items-center gap-x-1 disabled:opacity-40"
                            >
                              <TrashIcon className="fill-text-muted h-4 w-4" />
                              <span className="text-s14-l20 text-text-muted font-medium">
                                Remove
                              </span>
                            </button>
                          </GenericTooltip>
                        </div>
                      </div>

                      <span className="text-accent text-s20-l28 shrink-0 font-semibold">
                        {(cartItem.priceSnapshot * cartItem.quantity).toFixed(
                          2,
                        )}{" "}
                        {currencyMap.get(cartItem.currencyId) ?? ""}
                      </span>
                    </div>
                  </div>

                  {index !== items.length - 1 && (
                    <div className="border-border-secondary border-b" />
                  )}
                </>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;
