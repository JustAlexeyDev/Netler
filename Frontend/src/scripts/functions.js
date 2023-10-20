import { useState } from "react";
import backendIP from "../vars";
import axios from "axios";

const userDataURL = `${backendIP}/get_user/`;
const currentUserData = async () => {
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

const userData = async (id) => {
  try {
    const response = await axios.get(
      `${backendIP}/users/${id}/`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  };
};

const userPosts = async (id) => {
  try {
    const response = await axios.get(
      `${backendIP}/users/${id}/posts/`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  };
};

const sendComment = async (post_id, text) => {
  currentUserData()
  .then( async (currentUser) => {
    try {
      const response = await axios.post(
        `${backendIP}/comments/`,
        {
          'author': currentUser.id,
          'post': post_id,
          'text': text,
        }
      )
      console.log(response);
      return null
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
}

export default currentUserData;
export { userData, sendComment, userPosts };