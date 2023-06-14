<script>
	import { authenticateUser } from '../../../utils/auth.js';

	async function logInUser(evt) {
		evt.preventDefault();
		const userData = {
			email: evt.target['email'].value,
			password: evt.target['password'].value
		};
		const res = await authenticateUser(userData.email, userData.password);

		if (res.success) {
			console.log('logged in');
		} else {
			console.log('logged in failed');
		}
	}
</script>

<body>
	<div class="container py-4">
		<div class="row align-items-center">
			<div class="col-1" />
			<div class="col-lg-5">
				<div
					class="card cascading-right rounded-5 mt-14"
					style="
              background: hsla(0, 0%, 100%, 0.55);
              backdrop-filter: blur(30px);  
              "
				>
					<div class="card-body p-5 shadow-5">
						<h2 class="fw-bold mb-5 text-center">Login</h2>
						<form on:submit={logInUser}>
							<div class="form-outline mb-4">
								<label class="form-label" for="form3Example3">Email address</label>
								<input
									type="email"
									name="email"
									class="form-control p-3"
									placeholder="mail@example.com"
								/>
							</div>
							<div class="form-outline mb-4">
								<label class="form-label" for="form3Example4">Password</label>
								<input
									type="password"
									name="password"
									class="form-control p-3"
									placeholder="min of 6 characters"
								/>
							</div>
							<div class="d-flex justify-content-center">
								<button
									type="submit"
									class="btn btn-success btn-block btn-lg w-50 gradient-custom-4 text-dark btn-raised shadow my-button"
									>Log In</button
								>
							</div>

							<p class="text-center text-muted mt-5 mb-0">
								Dont have an account? <a href="/users/new" class="fw-bold text-body"
									><u>Sign Up</u></a
								>
							</p>
						</form>
					</div>
				</div>
			</div>

			<div class="col-lg-6 mb-3">
				<img
					src="https://static01.nyt.com/images/2021/03/11/arts/11nft-explain-1/merlin_184196631_939fb22d-b909-4205-99d9-b464fb961d32-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
					class="w-100 rounded-4 shadow-4"
					alt=""
				/>
			</div>
		</div>
	</div>
</body>

<style>
	body {
		background-image: linear-gradient(to right, #719ace, #fb8498);
	}
	.cascading-right {
		margin-right: -50px;
	}

	@media (max-width: 991.98px) {
		.cascading-right {
			margin-right: 0;
		}
	}
	.btn-raised {
		transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
			transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-shadow: 0 2px 5px 0 rgb(255, 255, 255);
	}

	.btn-raised:not([disabled]):active,
	.btn-raised:not([disabled]):focus,
	.btn-raised:not([disabled]):hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
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
