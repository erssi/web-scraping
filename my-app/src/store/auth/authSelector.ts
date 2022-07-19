import { RootState } from '../index';

/**
 * Declare selectors as function in order to be used directly in components
 * Ex: useSelector(selectUser) - will return  state.auth?.user
 */

const tokenSelector = (state: RootState) => state.auth?.token;

const userSelector = (state: RootState) => state?.auth?.user;

export { tokenSelector, userSelector };
