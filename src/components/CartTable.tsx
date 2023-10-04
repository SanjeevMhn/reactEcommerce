import { FC } from 'react';
import { CartItems, HandleItemDelete, HandleUpdateQuantity } from "./App";

type CartTableProps = {
	handleDecreaseQuantity: HandleUpdateQuantity,
	handleIncreaseQuantity: HandleUpdateQuantity,
	handleItemDelete: HandleItemDelete,
	total: number,
	cart: CartItems[]
}

const CartTable: FC<CartTableProps> = ({ handleDecreaseQuantity, handleIncreaseQuantity, handleItemDelete, total, cart})=> {
	return cart.length === 0 ? ( <h2>No items in the cart</h2> ) : (
        <div className="table-container">
            <table className="cart-list">
                <thead>
                    <tr>
                        <th>Sn</th>
                        <th>Name</th>
                        <th>Qunatity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((ct: CartItems, index: number) => {
                        return (
                            <tr key={ct.id}>
                                <td>{index + 1}</td>
                                <td>{ct.name}</td>
                                <td className='amount'>
                                    <div className="flex">
                                        <button type="button" onClick={() => handleDecreaseQuantity(ct, 1)}>-</button>
                                        <span className="quantity">
                                            {ct.quantity}
                                        </span>
                                        <button type="button" onClick={() => handleIncreaseQuantity(ct, 1)}>+</button>
                                    </div>
                                </td>
                                <td className='amount'>{ct.price}</td>
                                <td className='amount'>{ct.quantity * ct.price}</td>
                                <td>
                                    <button type="button" onClick={() => handleItemDelete(ct)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'right' }}> Sub Total </td>
                        <td className='amount'>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
		
}

export default CartTable;