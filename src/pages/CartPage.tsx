import { AddIcon, RemoveIcon, TrashIcon } from "../assets/icons";
import { useCartActions } from "../hooks/useCartActions";
import GenericTooltip from "../shared/components/GenericTooltip";
import { useCartStore } from "../stores/CartStore";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const { updateCart, removeFromCart, isLoading } = useCartActions();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold">
        My Cart ({cartItems.length} Product)
      </h1>

      <div className="flex gap-x-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="max-h-[520px] overflow-y-auto pr-2">
            {cartItems.map((cartItem) => {
              const thumb =
                cartItem.product.images.find((img) => img.isPrimary)
                  ?.thumbUrl || cartItem.product.images[0]?.thumbUrl;

              const isMin = cartItem.quantity <= 1;
              const isMax = cartItem.quantity >= cartItem.product.stockCount;

              return (
                <div
                  key={cartItem.productId}
                  className="mb-4 rounded-lg border bg-white p-5"
                >
                  <div className="flex items-center gap-x-6">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded bg-gray-100">
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

                      <p className="mt-1 text-sm text-gray-600">
                        {cartItem.product.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-x-3 rounded-full border px-3 py-1">
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
                          className="rounded p-1 hover:bg-gray-100 disabled:opacity-40"
                        >
                          <RemoveIcon className="h-4 w-4" />
                        </button>
                      </GenericTooltip>

                      <span className="w-6 text-center text-sm font-medium">
                        {cartItem.quantity}
                      </span>

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
                          className="rounded p-1 hover:bg-gray-100 disabled:opacity-40"
                        >
                          <AddIcon className="h-4 w-4" />
                        </button>
                      </GenericTooltip>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-orange font-semibold">
                        {(cartItem.priceSnapshot * cartItem.quantity).toFixed(
                          2,
                        )}{" "}
                        TL
                      </p>
                    </div>

                    <GenericTooltip content="Remove item from cart">
                      <button
                        disabled={isLoading}
                        onClick={() =>
                          removeFromCart(cartItem.productId, cartItem.id)
                        }
                        className="shrink-0 rounded p-2 hover:bg-red-50 disabled:opacity-40"
                      >
                        <TrashIcon
                          className="h-4 w-4"
                          style={{ fill: "#fb2c36" }}
                        />
                      </button>
                    </GenericTooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[340px] shrink-0">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Cart Summary</h2>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} TL</span>
            </div>

            <div className="my-4 h-px bg-gray-200" />

            <div className="mb-4 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-orange">{totalPrice.toFixed(2)} TL</span>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="bg-orange hover:bg-orange-dark disabled:bg-orange/40 w-full rounded py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed"
            >
              Confirm Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
