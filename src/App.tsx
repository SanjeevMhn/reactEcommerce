import { FC, useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home';
import CartTable from './components/CartTable'
import Products from './components/Products';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { useToast } from './context/ToastContext';
import useConfirmation from './hooks/useConfrmation';

export type ProductItem = {
  id: number,
  name: string,
  price: number 
}

export type CartItems = ProductItem & {
  quantity: number,
}

export type HandleAddToCart = (obj: ProductItem, quantity:number) => void;
export type HandleUpdateQuantity = (obj: CartItems, num:number) => void;
export type HandleItemDelete = (obj: CartItems) => void;

const App:FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [items,setItems] = useState<ProductItem[]>([
    {
      id: 1,
      name: "Chips",
      price: 50
    },
    {
      id: 2,
      name: "Noodles",
      price: 20
    },
    {
      id: 3,
      name: "Cookies",
      price: 120
    },
    {
      id: 4,
      name: "Soda",
      price: 10
    },
    {
      id: 5,
      name: "Chocolate",
      price: 200
    },
    {
      id: 6,
      name: "Coffee",
      price: 350
    },
  ])

  const [cart, setCart] = useState<CartItems[]>([]);
  const { showToast } = useToast();

  const getTotalAmount = ():void => {
    let sum = 0;
    cart.map(ct => {
      sum += ct.quantity * ct.price
    });

    setTotal(sum);
  }


  const handleDecreaseQuantity:HandleUpdateQuantity = (obj: CartItems, num: number):void => {
    const updatedCartList = cart.map((ct) => {
      if(ct.id === obj.id && ct.quantity !== 1){
        return { ...ct, quantity: ct.quantity - num }
      }
      return ct;
    });

    setCart(updatedCartList);
  }


  const handleIncreaseQuantity:HandleUpdateQuantity = (obj: CartItems, num: number):void => {
    const updatedCartList = cart.map((ct) => {
      if(ct.id === obj.id){
        return { ...ct, quantity: ct.quantity + num }
      }
      return ct;
    });

    setCart(updatedCartList);
  }


  const {confirm} = useConfirmation();
  const handleItemDelete:HandleItemDelete = async(obj: CartItems) => {
 
    let result = await confirm('Do you want to delete this item?');
    if(result){
      const updatedCartList = cart.filter((ct) => ct.id !== obj.id);
      setCart(updatedCartList);
      showToast("Item Deleted", "success");
    }
    
  }


  const handleAddToCart:HandleAddToCart = (obj:ProductItem, quantity:number):void => {
    if(cart.find((ct) => ct.id === obj.id)){
      return;
    }
    const cartItem:CartItems = {
      ...obj,
      quantity: quantity
    }
    setCart([...cart,cartItem]);
    showToast("Item added to cart!","success");

  }

  useEffect(() => {
    getTotalAmount();
  },[cart]);

  return (
    <Routes>
      <Route path="/" element={<Layout cart={cart} />}>
        <Route index element={<Home/>} />
        <Route 
          path="/products" 
          element={<Products 
                items={items} 
                handleAddToCart={handleAddToCart}
              />} 
        />
        <Route 
          path="/cart" 
          element={<CartTable
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleItemDelete={handleItemDelete}
              total={total}
              cart={cart}
           />}
        />
      </Route>
    </Routes>
  )
}

export default App
