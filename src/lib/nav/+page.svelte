<script>
	import { isLoggedInStore, logOut, getUserName, getUserId } from '../../utils/auth.js';
	import Alert from '../alert/+page.svelte';
	import { goto } from '$app/navigation';
	import { alertMessage } from '../alert/page.js';
	getUserId();

	const logOutFunc = () => {
		logOut();
		goto('/');
	};
</script>

<header class="position-sticky top-0 z-2">
	<nav class="navbar navbar-expand-lg shadow-lg rounded navbar-dark bg-dark">
		<div class="container-fluid">
			<a href="/" class="navbar-brand fw-bold ms-2"
				><img src="/rsz_1icons8-safe-100.png" alt="icon" />PixelVault</a
			>
			<div class="d-flex flex-row">
				{#if $isLoggedInStore}
					<p class="text-white my-2" style="cursor: default">{getUserName()}</p>
				{:else}
					<p class="text-white my-2" style="cursor: default">Welcome</p>
				{/if}
				<div class="dropdown mx-md-2 mx-0">
					<button
						class="btn dropdown-toggle"
						type="button"
						id="dropdownMenuButton1"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="25"
							fill="currentColor"
							class="bi bi-person-circle text-light"
							viewBox="0 0 16 16"
						>
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
							<path
								fill-rule="evenodd"
								d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
							/>
						</svg>
					</button>
					<ul
						class="dropdown-menu dropdown-menu-end position-absolute"
						aria-labelledby="dropdownMenuButton1"
					>
						{#if $isLoggedInStore}
							<li><a class="dropdown-item" href="/NFT/ownerpage/{getUserId()}">Listing</a></li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<li><a class="dropdown-item" href="/NFT/new">Create Item</a></li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<li>
								<a class="dropdown-item" on:click={logOutFunc} style="cursor: pointer;">Logout</a>
							</li>
						{:else}
							<li><a class="dropdown-item" href="/users/new/">Sign Up</a></li>
							<li><a class="dropdown-item" href="/users/login">Login</a></li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</nav>
	{#if $alertMessage}
		<Alert />
	{/if}
</header>
