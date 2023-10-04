import { useState, FC} from 'react';
import { HandleAddToCart, ProductItem } from "./App";


type ProductCardProps = {
	item: ProductItem,
	handleAddToCart: HandleAddToCart,
}

const ProductCard:FC<ProductCardProps> = ({item,handleAddToCart}) => {

	const [quantity, setQuantity] = useState(1);

	const handleIncreaseQuanity = () => {
		setQuantity(quantity + 1)
	}

	const handleDecreaseQuanity = () => {
		if(quantity == 0){
			return;
		}
		setQuantity(quantity - 1)
	}
	return(
		<div className="product-card">
			<div className="product-detail">
				<h2 className="product-name">{item.name}</h2>
				<p className="product-name">Rs.&nbsp;{item.price}</p>
			</div>
			<div className="product-quantity">
				<button type="button" onClick={()=>handleDecreaseQuanity()}>-</button>
				<span className="product-quantity-num">{quantity}</span>
				<button type="button" onClick={()=>handleIncreaseQuanity()}>+</button>
			</div>
			<div className="product-action">
				<button type="button" className="add-to-card" onClick={()=>handleAddToCart(item, quantity)}>Add to Cart</button>
			</div>
		</div>
	)
}

export default ProductCard;