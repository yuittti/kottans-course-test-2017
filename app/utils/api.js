import axios from 'axios';

export const fetchRepos = (username, page) => {
  // return axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=10`);
  return axios({
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`,
    headers: {
      'Accept': 'application/vnd.github.mercy-preview+json'
    }
  })
}

export const getProfile = (username) => {
	return axios
		.get('https://api.github.com/users/' + username)
		.then(user => user.data);
}

