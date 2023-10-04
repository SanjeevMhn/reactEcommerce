import{ FC } from 'react';
import {  HandleAddToCart, ProductItem } from '../App';
import ProductCard from './ProductCard';

type ProductsProps = {
	items: ProductItem[],
	handleAddToCart: HandleAddToCart,
}

const Products:FC<ProductsProps> = ({items, handleAddToCart }) => {
	return(
		<ul className="product-items-list">
			{
				items.map((item: ProductItem) => {
					return (
						<li className="product-item" key={item.id}>
							<ProductCard 
								item={item}
								handleAddToCart={handleAddToCart}
							 />
						</li>
					)
				})
			}
		</ul>
	)
}

export default Products;