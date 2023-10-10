export const SHOW_CONFIRM:string = 'SHOW_CONFIRM';
export const HIDE_CONFIRM:string = 'HIDE_CONFIRM';


export type ConfirmStateType = {
	show: boolean,
	text?: string
}

export const initialState:ConfirmStateType = {
	show: false
}

export type ReducerActionType = {
	type: "SHOW_CONFIRM" | "HIDE_CONFIRM",
	payload:{
		text: string
	}
}

export const reducer = (state = initialState, action:ReducerActionType) => {
	switch(action.type) {
		case SHOW_CONFIRM:
			return{
				show: true,
				text: action.payload.text
			}

		case HIDE_CONFIRM:
			return initialState

		default:
			return initialState
	}
}