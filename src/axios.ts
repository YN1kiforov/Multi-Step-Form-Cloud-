import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.sbercloud.ru/content/v1/bootcamp/frontend',
	timeout: 3000
});

export default instance