export default function changeState(state) {
    return ({
        type: 'TEST_ACTION',
        payload: !state
    });
}
