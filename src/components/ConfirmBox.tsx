import useConfirmation from "../hooks/useConfrmation"

const ConfirmBox = () => {
	const { onConfirm, onCancel, state } = useConfirmation();
	return(
		<div className="confirm-container">
			<h2 className="confirm-message">{state.text}</h2>
			<div className="confirm-actions"> 
				<button type="button" onClick={onConfirm}>Yes</button>
				<button type="button" onClick={onCancel}>No</button>
			</div>
		</div> 
	)
	

}

export default ConfirmBox;