import { useContext } from "react";
import ConfirmContext from "../context/ConfirmContext";
import { SHOW_CONFIRM, HIDE_CONFIRM, ConfirmStateType } from "../store/Reducer";


let resolveCallback:any;


function useConfirmation(){
	const [state, dispatch] = useContext(ConfirmContext);

	const onConfirm = () =>{
		closeConfirm();
		resolveCallback(true);
	}

	const onCancel = () =>{
		closeConfirm();
		resolveCallback(false);
	}

	const confirm = (text:string) => {
		dispatch({
			type: SHOW_CONFIRM,
			payload: {
				text: text
			}
		});


		return new Promise((resolve, reject) => {
			resolveCallback = resolve;
		})
	}

	const closeConfirm = () => {
		dispatch({
			type: HIDE_CONFIRM,
		})
	}

	return { confirm, onConfirm, onCancel, state }
}

export default useConfirmation;