

export default function reducer(state = { user: null }, action) {
    if (action.type === 'CREATE_USER') {
        return {

            user: action.payload.user,
        }
    } else if (action.type === 'DELETE_USER') {
        return {
            user: null
        }
    }

    return state;
}