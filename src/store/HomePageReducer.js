const initialState = {
    homeState: false
};

export default function HomePageReducer(state = initialState, action) {
    switch (action.type) {
        case 'TEST_ACTION': {
            return {
                ...state,
                homeState: action.payload
            };
        }
        default: {
            return { ...state };
        }
    }
}
