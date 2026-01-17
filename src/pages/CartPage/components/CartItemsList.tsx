import { useMemo } from "react";
import { AddIcon, RemoveIcon, TrashIcon } from "../../../assets/icons";
import { useCartActions } from "../../../hooks/useCartActions";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import GenericTooltip from "../../../shared/components/GenericTooltip";
import { useCartStore } from "../../../stores/CartStore";

const CartItemsList = () => {
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

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="max-h-[520px] overflow-y-auto pr-2">
        {cartItems.map((cartItem) => {
          const thumb =
            cartItem.product.images.find((img) => img.isPrimary)?.thumbUrl ||
            cartItem.product.images[0]?.thumbUrl;

          const isMin = cartItem.quantity <= 1;
          const isMax = cartItem.quantity >= cartItem.product.stockCount;

          return (
            <div
              key={cartItem.productId}
              className="border-gray-2 bg-surface-primary mb-4 rounded-lg border p-5"
            >
              <div className="flex items-center gap-x-6">
                <div className="bg-gray-4 h-28 w-28 shrink-0 overflow-hidden rounded">
                  {thumb && (
                    <img
                      src={thumb}
                      alt={cartItem.product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-semibold">{cartItem.product.name}</p>

                  <p className="text-s14-l20 text-gray-9 mt-1">
                    {cartItem.product.description}
                  </p>
                </div>

                <div className="border-gray-2 flex shrink-0 items-center gap-x-3 rounded-full border px-3 py-1.5">
                  <GenericTooltip
                    content={isMin ? "Minimum quantity is 1" : ""}
                  >
                    <button
                      disabled={isLoading || isMin}
                      onClick={() =>
                        updateCart(
                          cartItem.productId,
                          cartItem.quantity - 1,
                          cartItem.id,
                        )
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
                        updateCart(
                          cartItem.productId,
                          cartItem.quantity + 1,
                          cartItem.id,
                        )
                      }
                      className="group cursor-pointer rounded p-1"
                    >
                      <AddIcon className="fill-orange group-disabled:fill-gray-1 h-4 w-4" />
                    </button>
                  </GenericTooltip>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-orange font-semibold">
                    {(cartItem.priceSnapshot * cartItem.quantity).toFixed(2)}{" "}
                    {currencyMap.get(cartItem.currencyId) ?? ""}
                  </p>
                </div>

                <GenericTooltip content="Remove item from cart">
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      removeFromCart(cartItem.productId, cartItem.id)
                    }
                    className="hover:bg-red-1 shrink-0 cursor-pointer rounded p-2 disabled:opacity-40"
                  >
                    <TrashIcon className="fill-error-primary h-4 w-4" />
                  </button>
                </GenericTooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItemsList;
