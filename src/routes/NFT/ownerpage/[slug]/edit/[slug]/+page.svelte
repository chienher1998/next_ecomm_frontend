<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getTokenFromLocalStorage, getUserId } from '../../../../../../utils/auth';
	import { goto } from '$app/navigation';
	import { displayAlert } from '../../../../../../lib/alert/page';
	import { _statusSpinner } from '../../../../../../lib/spinner/+page';
	import Spinner from '../../../../../../lib/spinner/+page.svelte';
	export let data;

	if (!getUserId()) {
		goto('/users/login');
	}

	async function updateImage(evt) {
		_statusSpinner.set(true)
		evt.preventDefault();
		const imageData = {
			title: evt.target['imageTitle'].value,
			desc: evt.target['desc'].value,
			price: evt.target['price'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/image/${data.image.id}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getTokenFromLocalStorage()}`
			},
			body: JSON.stringify(imageData)
		});
		if (resp.status == 200) {
			goto('/');
			_statusSpinner.set(false)
			displayAlert('Update Successful !', 'alert-success');
		} else {
			_statusSpinner.set(false)
			const res = await resp.json();
			formErrors = res.error;
			throw 'authentication failed';
		}
	}
</script>

<div class="container my-5 text-white">
	<div class="row my-5">
		<div id="card" class="overflow-hidden ms-lg-5 col-lg-4 col-md-6 mb-4">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={data.image.imageFile}
				alt="image"
				class="w-100 h-100 rounded-5"
				style="object-fit:cover"
			/>
		</div>
		<div
			class="ms-5 p-5 text-white col-lg-7 shadow-lg rounded-5"
			style="background-color: #272A2E;"
		>
			<div class="mb-4">
				<h1 class="fw-bold">Edit Item</h1>
				<small style="color:#8A939B"
					>Please don't modify the existing info if you dont not wish to update the respective information.</small
				>
			</div>

			<form on:submit|preventDefault={updateImage} class="text-white">
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label fw-bold">Name *</label>
					<input
						type="text"
						class="form-control bg-dark text-white"
						name="imageTitle"
						placeholder="Item name"
						value={data.image.title}
						required
					/>
				</div>
				<div class="mb-3 d-flex flex-column">
					<label for="exampleFormControlTextarea1" class="form-label fw-bold">Description *</label>
					<small class="mb-3" style="color:#8A939B"
						>The description will be included on the item's detail page beside its image</small
					>
					<textarea
						class="form-control bg-dark text-white"
						name="desc"
						rows= 10
						placeholder="Provide a detailed description of your item"
						value={data.image.desc}
						required
					/>
				</div>
				<label for="exampleFormControlInput1" class="form-label fw-bold">Price *</label><br />
				<small style="color:#8A939B">The maximum amount of etherium can be listed is 500</small>
				<div class="input-group mb-4 mt-3">
					<div class="input-group-prepend">
						<span class="input-group-text bg-dark"
							><svg
								style="color: white; height: 20px;"
								class="mt-1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 40 325 512"
								><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
									d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
									fill="white"
								/></svg
							></span
						>
					</div>
					<input
						type="number"
						class="form-control bg-dark text-white"
						name="price"
						placeholder="Enter your price"
						step="0.001"
						max="500"
						value={data.image.price}
						required
					/>
				</div>
				{#if $_statusSpinner}
				<button class="btn btn-primary p-2 fw-bold w-100 mt-2 disabled"><Spinner/></button>
				{:else}
				<button class="btn btn-primary p-2 fw-bold w-100 mt-2"><Spinner/>Update</button>
				{/if}
			</form>
		</div>
	</div>
</div>

<style>
	#card {
		width: 425px;
		height: 600px;
	}

	::placeholder {
		color: gray;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
