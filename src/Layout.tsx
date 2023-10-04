import { FC, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartItems } from "./App";


type LayoutProps = {
	cart: CartItems[],
}

type MenuLinkProps = {
	link: string,
	name: string,
	cart?: CartItems[]
}

type MenuItem = Omit<MenuLinkProps, 'cart'>;

const menuItems:MenuItem[] = [
	{
		link: "/",
		name: "Home"	
	},
	{
		link: "/products",
		name: "Products"	
	},
	{
		link: "/cart",
		name: "Cart",
	},
]

const MenuLink:FC<MenuLinkProps> =  ({link,name,cart}) => {
	return name === 'Cart' ? (
		<NavLink to={link} className='nav-link cart-num'>
			{name}
			<span className="cart-num-ind">{cart?.length}</span>
		</NavLink>
	) : (
		<NavLink to={link} className='nav-link'>
			{name}
		</NavLink>
	)

}

const Layout:FC<LayoutProps> = ({cart}) => {

	const [showSideNav, setShowSideNav] = useState<boolean>(false);

	return(
		<div className={ showSideNav ? 'main-wrapper fixed' : 'main-wrapper'}>
			<div className={ showSideNav ? "show offscreen-navigation" : "offscreen-navigation"}>
				<div className="inner-nav-container">
					<button type="button" onClick={() => setShowSideNav(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="#fff">
							<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
						</svg>
					 </button>
					<ul className="offscreen-link-list">
						{
							menuItems.map((item,index:number) => {
								return(
									<li className="nav-item" key={index}  onClick={() => setShowSideNav(false)}>
										<MenuLink link={item.link} name={item.name} />
									</li>
									
								)
							})
						}
					</ul>
				</div>
			</div>
			<nav>
				<div className="inner-container flex">
					<Link to="/" className="brand-link">
						Shop
					</Link>
					<ul className="nav-link-list">
						{
							menuItems.map((item,index) => {
								return(
									item.name === 'Cart' ? (
										<li className="nav-item" key={index+1}>
											<MenuLink link={item.link} name={item.name} cart={cart} />
										</li>
									):(
										<li className="nav-item" key={index}>
											<MenuLink link={item.link} name={item.name} />
										</li>
									)
									
								)
							})
						}
					</ul>
					<div className="offscreen-menu-container">
						<button type="button" className="offscreen-menu-btn" onClick = {()=>{setShowSideNav(true)}}>
							<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
						</button>
					</div>
				</div>
			</nav>
			<section className="main-section">
				<div className="inner-container">
					<Outlet />
				</div>
			</section>
		</div>
	)
}

export default Layout;