import setAuthToken from "../setAuthToken";
import { setCurrentUser } from "./loginActions";

export const logoutUser = (props) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}