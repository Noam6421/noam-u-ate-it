const initalState = {
    user: {
        name: '',
        lastName: '',
        birthDate: new Date('2014-08-18T21:11:54'),
        beer: '',
        idNum: '',
        phone: ''
    }
}

export const userReducer = (state: UserState = initalState, action: UserAction ) => {
    switch(action.type){
        case "GET_USER": {
            return {...state, user: action.user}
        }
        case 'UPDATE_USER': {
            return {...state, user: {...state.user, ...action.user}}
        }
        default:
            return state
    }
}