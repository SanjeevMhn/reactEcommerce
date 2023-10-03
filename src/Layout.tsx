import { FC } from "react";
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
		<NavLink to={link} className='nav-link cart-num' style={({isActive}) => ({color: isActive ? '#3393c2' : '#fff'})}>
			{name}
			<span className="cart-num-ind">{cart?.length}</span>
		</NavLink>
	) : (
		<NavLink to={link} className='nav-link' style={({isActive}) => ({color: isActive ? '#3393c2' : '#fff'})}>
			{name}
		</NavLink>
	)

}

const Layout:FC<LayoutProps> = ({cart}) => {
	return(
		<div className="main-wrapper">
			<div className="offscreen-navigation">
				<ul className="offscreen-link-list">
					{
						menuItems.map((item) => {
							return(
								item.name === 'Cart' ? (
									<li className="nav-item">
										<MenuLink link={item.link} name={item.name} cart={cart} />
									</li>
								):(
									<li className="nav-item">
										<MenuLink link={item.link} name={item.name} />
									</li>
								)
								
							)
						})
					}
				</ul>
			</div>
			<nav>
				<div className="inner-container flex">
					<Link to="/" className="brand-link">
						Shop
					</Link>
					<ul className="nav-link-list">
						{
							menuItems.map((item) => {
								return(
									item.name === 'Cart' ? (
										<li className="nav-item">
											<MenuLink link={item.link} name={item.name} cart={cart} />
										</li>
									):(
										<li className="nav-item">
											<MenuLink link={item.link} name={item.name} />
										</li>
									)
									
								)
							})
						}
					</ul>
					<div className="offscreen-menu-container">
						<button type="button" className="offscreen-menu-btn">
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