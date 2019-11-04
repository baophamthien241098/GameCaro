export const SUCCESS =  'ALERT_SUCCESS';
export const ERROR =  'ALERT_ERROR';
export const CLEAR =  'ALERT_CLEAR';
export const  success = (message) => {
   
    return { type: SUCCESS, message };
}
export const  error = (message) => {
   
    return { type: ERROR, message };
}
export const  clear = (message) => {
    return { type: CLEAR, message };
}
