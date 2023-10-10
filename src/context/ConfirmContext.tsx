import { useReducer, createContext } from 'react';
import { initialState, reducer } from '../store/Reducer';
import ConfirmBox from '../components/ConfirmBox';

const ConfirmContext = createContext();

export default ConfirmContext;

export const ConfirmContextProvider = ({children}:any) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return(
		<ConfirmContext.Provider value={[state,dispatch]}>
			{children}
			<div className="confirmation-overlay">
				{
					state.show ? (
						<ConfirmBox />
					) : null
				}
			</div>
		</ConfirmContext.Provider>
	)
}