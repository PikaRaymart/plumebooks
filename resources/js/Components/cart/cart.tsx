import { useDetectResponsiveness } from "@/Hooks/useDetectResponsiveness"
import { useCart } from "./cart.hooks"
import { 
  CartBottomRow,
  CartOptions,
  CheckoutOption,
  InnerWrapper, 
  MainWrapper, 
  TotalCartPrice, 
  UpdateOption } from "./cart.styled"
import { CartList } from "./list"
import { CartTable } from "./table"
import { Link } from "@inertiajs/react"
import { usePageProps } from "@/Hooks/usePageProps"
import { CartPageProps } from "@/Pages/Cart"
import { ListBook } from "./list/book"
import { TableBook } from "./table/book"
import { BookQuantityOption } from "../book/options/quantity"


const Cart = () => {
  const { data, handleChangeCartQuantity, handleRemoveCartBook, handleSubmitCartUpdates } = useCart()
  const { cart } = usePageProps<CartPageProps>()
  const isMobile = useDetectResponsiveness()

  return (
    <MainWrapper>
      <h1 className="sr-only">Your cart</h1>
      <InnerWrapper>
        { isMobile && (
          <CartList>
            { cart.map(({ cartId, book }) => (
              <ListBook
                key={ cartId }
                book={ book }
                handleRemoveCartBook={ ( remove ) => handleRemoveCartBook(cartId, remove) }>
                <BookQuantityOption
                  quantity={ data.updates.find(update => update.cartId===cartId)?.quantity?? 0 }
                  stocks={ book.stocks }
                  handleChangeQuantity={ ( quantity: number ) => handleChangeCartQuantity(cartId, quantity) }
                  isSmall={ true } />
              </ListBook>
                )) }
          </CartList>
        )  }
        { !isMobile && (
          <CartTable>
            { cart.map(({ cartId, book }) => (
              <TableBook
                key={ cartId }
                book={ book }
                handleRemoveCartBook={ ( remove ) => handleRemoveCartBook(cartId, remove) } >
                <BookQuantityOption
                  quantity={ data.updates.find(update => update.cartId===cartId)?.quantity?? 0 }
                  stocks={ book.stocks }
                  handleChangeQuantity={ ( quantity: number ) => handleChangeCartQuantity(cartId, quantity) }/>
              </TableBook>
                )) }
          </CartTable>
        ) }
        <CartBottomRow onSubmit={ handleSubmitCartUpdates }>
          <TotalCartPrice>
            <span>Total: </span>
            ₱{ data.updates.reduce((accu, curr) => accu + curr.quantity * (cart.find(cartItem => cartItem.cartId===curr.cartId)?.book.price??0), 0).toFixed(2) }
          </TotalCartPrice>     
          <CartOptions>
            <UpdateOption type="submit">Update Cart</UpdateOption>
            <CheckoutOption>
              <Link href="#">Proceed Checkout</Link>
            </CheckoutOption>
          </CartOptions>
        </CartBottomRow>
      </InnerWrapper>
    </MainWrapper>
  )
}


export default Cart