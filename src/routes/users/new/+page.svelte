<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import Background from '../../../lib/bg/+page.svelte';

	let formErrors = {};

	async function createUser(evt) {
		evt.preventDefault();
		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			return;
		}

		const userData = {
			name: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});
		if (resp.status == 200) {
			goto('/users/login');
			console.log('sign up succeed');
		} else {
			const res = await resp.json();
			formErrors = res.error;
			throw 'Sign up succeeded but authentication failed';
		}
	}
</script>

<Background />
<div class="mask d-flex align-items-center h-100 my-5">
	<div class="container h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-9 col-lg-7 col-xl-6">
				<div
					class="card rounded-5"
					style=";
					background: hsla(0, 0%, 100%, 0.55);
					backdrop-filter: blur(30px);
					"
				>
					<div class="card-body p-5">
						<h2 class="text-uppercase fw-bold text-center mb-5">Create an account</h2>

						<form on:submit={createUser}>
							<div class="mb-4 form-floating">
								<input
									type="text"
									class="form-control"
									name="username"
									placeholder="johndoe"
									required
								/>
								<label for="floatingInput" class="text-muted">Enter your username</label>
							</div>
							<div class="mb-4 form-floating">
								<input
									type="email"
									class="form-control"
									name="email"
									placeholder="email"
									required
								/>
								{#if 'email' in formErrors}
									<span class="text-danger">{formErrors.email}</span>
								{/if}
								<label for="floatingInput" class="text-muted">Enter email address</label>
							</div>

							<div class="mb-3 form-floating">
								<input
									type="password"
									name="password"
									class="form-control"
									placeholder="Create Password"
									aria-labelledby="passwordHelpBlock"
									required
								/>
								<label for="floatingInput" class="text-muted">Create Password</label>
							</div>

							<div class="mb-5 form-floating">
								<input
									type="password"
									name="password-confirmation"
									class="form-control"
									placeholder="Confirm Password"
									aria-labelledby="passwordHelpBlock"
									required
								/>
								{#if 'password' in formErrors}
									<span class="text-danger">{formErrors['password'].message}</span>
								{/if}
								<label for="floatingInput" class="text-muted">Repeat Password</label>
							</div>

							<div class="d-flex justify-content-center">
								<button
									type="submit"
									class="btn btn-success btn-block btn-lg w-50 gradient-custom-4 text-dark btn-raised shadow my-button"
									>Register</button
								>
							</div>

							<p class="text-center text-muted mt-5 mb-0">
								Have already an account? <a href="/users/login" class="fw-bold text-body"
									><u>Login here</u></a
								>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.btn-raised {
		transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
			transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-shadow: 0 2px 5px 0 rgb(255, 255, 255);
	}

	.btn-raised:not([disabled]):active,
	.btn-raised:not([disabled]):focus,
	.btn-raised:not([disabled]):hover {
		box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.4);
		transform: translate3d(0, -1px, 0);
	}

	.shadow {
		overflow: hidden;
		position: relative;
		transform: translate3d(0, 0, 0);
	}

	.shadow:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: auto;
		height: auto;
		pointer-events: none;
		background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: scale(10, 10);
		opacity: 0;
		transition: transform 0.5s, opacity 1.5s;
	}

	.shadow:active:before {
		transform: scale(0, 0);
		opacity: 0.1;
		transition: 0s;
	}

	.gradient-custom-4 {
		/* fallback for old browsers */
		background: #84fab0;

		/* Chrome 10-25, Safari 5.1-6 */
		background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
	}
</style>
