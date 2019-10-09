export const CLICK_HISTORY = 'CLICK_HISTORY';
export const HANDLE_CLICK = 'HANDLE-CLICK';
export const CLICK_RESET ='CLICK_RESET';
export const CLICK_SORT ='CLICK_SORT';

export const clickHistory = (value) => {
    return {
        type: CLICK_HISTORY,
        val:value,
    };
};
export const handleClick = (value) => {
    return {
        type: HANDLE_CLICK,
        val:value,
    };
};
export const clickreset = () => {
    return {
        type: CLICK_RESET
    };
};
export const clicksort = (value) => {
    return {
        type: CLICK_SORT,
        val:value,
    };
};
