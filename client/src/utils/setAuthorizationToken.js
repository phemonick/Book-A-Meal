import decode from 'jwt-decode';
import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
    console.log({
      token,
      auth: 'authorization set',
    });
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationToken;