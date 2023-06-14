import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

const emptyAuth = {
	token: '',
	userId: ''
};

export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
}

export function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['userId'];
	}
	return null;
}

export function getTokenFromLocalStorage() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}


export async function authenticateUser(email, password) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/sign-in', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			identity: email,
			password
		})
	});

	const res = await resp.json();

	if (resp.status == 200) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.token,
				userId: res.record.id
			})
		);

		return {
			success: true,
			res: res
		};
	}

	return {
		success: false,
		res: res
	};
}