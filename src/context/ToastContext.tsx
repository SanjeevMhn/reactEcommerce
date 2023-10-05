import { createContext, useContext, useState } from 'react';
import Toast, { ToastProps } from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => {
	return useContext(ToastContext);
}

export const ToastProvider = ({children}:any) => {
	const [toasts, setToasts] = useState<ToastProps[]>([]);

	const showToast = (message:string, type:'success' | 'error') => {
		const newToast:ToastProps = {
			id: Date.now(),
			message: message,
			type: type
		}

		setToasts((prevToasts) => [...prevToasts,newToast]);

		setTimeout(() => removeToast(newToast.id), 2000);
	}

	const removeToast = (id?:number) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
	}

	return (
		<ToastContext.Provider value={{showToast}}>
			{children}
			<div className="toast-container">
				{toasts.map((toast) => {
					return (
						<Toast key={toast.id} message={toast.message} type={toast.type} />
					)
				})}

			</div>
		</ToastContext.Provider>
	)
}