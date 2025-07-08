import * as Popover from '@radix-ui/react-popover';
import { useCartStore } from '../../../stores/CartStore';
import { useProductStore } from '../../../stores/ProductStore';
import { useMemo } from 'react';
import { ShoppingCartIcon } from '../../../assets/icons';

const CartPopover = () => {
  const cart = useCartStore((state) => state.cart);
  const products = useProductStore((state) => state.products);

  const cartProducts = useMemo(
    () =>
      cart.map((cartItem) => {
        const product = products.find((product) => product.id === cartItem.productId)!;

        return { ...product, count: cartItem.count };
      }),
    [cart, products],
  );

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.count * product.price;
  }, 0);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative">
          <ShoppingCartIcon className="fill-white" />
          <div className="rounded-full absolute flex items-center justify-center -top-1.5 -right-1.5 bg-red-600 h-4 w-4">
            <span className="text-s12-l16 font-bold text-white">{cart.length}</span>
          </div>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          {cart.length > 0 ? (
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-1">
                {cartProducts.map((cartProduct, index) => (
                  <span className="text-s14-l20 text-textPrimary">
                    {`${index + 1}. ${cartProduct.name} ${cartProduct.price} TL ${
                      cartProduct.count
                    } Adet`}
                  </span>
                ))}
              </div>

              <div className="bg-black h-[1px]" />

              <span className="text-s14-l20 text-textPrimary">
                Toplam Sepet Tutarı: {totalPrice} TL
              </span>

              <button className="bg-orange-500 rounded-md text-white">Ödemeye Git</button>
            </div>
          ) : (
            <span className="text-s12-l16 text-textSecondary">
              Sepetinizde ürün bulunmamaktadır.
            </span>
          )}
          <Popover.Close
            className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
            aria-label="Close"
          >
            X
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CartPopover;
