import backendIP from "../vars";
import axios from "axios";

const userDataURL = `${backendIP}/get_user/`;
const getUserData = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get(
        userDataURL,
        {
          headers: {
            Authorization: `Token ${token}` 
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  } else {
    return 'Не авторизован';
  }
};

export default getUserData