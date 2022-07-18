// import crypto from 'crypto';

// export const setAlert = (msg, style, timeout) => dispatch => {
//     const id = crypto.randomBytes(4).toString("hex");
//     dispatch({
//         type: "setAlert",
//         payload: { msg, style, id }
//     });

//     if (timeout) {
//         setTimeout(() => {
//             dispatch({ type: 'removeAlert', payload: id });
//         }, timeout);
//     }
// };

// export const clearAlerts = () => dispatch => {
//     dispatch({ type: 'clearAlerts' });
// };