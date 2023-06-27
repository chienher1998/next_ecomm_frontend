<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { uploadMedia } from '../../../utils/s3-uploader';
	import { getTokenFromLocalStorage } from '../../../utils/auth.js';
	import { displayAlert} from '../../../lib/alert/page.js'

	let formErrors = {};

	async function uploadImage(evt) {
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
		const imageData = {
			title: evt.target['imageTitle'].value,
			desc: evt.target['desc'].value,
			price: evt.target['price'].value,
			imageFile: fileUrl
		};
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/image', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getTokenFromLocalStorage()}`
			},
			body: JSON.stringify(imageData)
		});
		if (resp.status == 200) {
			goto('/');
			displayAlert('Post Successful !','alert-success');
		} else { 	
			const res = await resp.json();
			console.log(res.error);
			formErrors = res.error;
			throw 'post failed';
		}
	}
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="container p-5 my-5 text-white col-lg-5 shadow-lg rounded-5" style="background-color: #272A2E;">
	<h1 class="mb-5 fw-bold">Create New Item</h1>
	<form on:submit|preventDefault={uploadImage} class="text-white">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label fw-bold">Name *</label>
			<input
				type="text"
				class="form-control bg-dark text-white"
				name="imageTitle"
				placeholder="Item name"
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
				rows="6"
				placeholder="Provide a detailed description of your item"
				required
			/>
		</div>
		<label for="exampleFormControlInput1" class="form-label fw-bold">Price *</label><br />
		<small style="color:#8A939B"
			>The maximum amount of etherium can be listed is 500</small
		>
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
				required
			/>
		</div>
		<div class="d-flex flex-column">
			<span class="form-label fw-bold">Image *</span>
			<small class="mb-3" style="color:#8A939B"
				>File types supported: JPG, PNG, GIF. Max Size: 100 MB</small
			>
			<input class="form-control mb-5 bg-dark text-white" name="file" type="file"/>
			<!-- {#if 'file' in formErrors}
				<span class="text-danger">{formErrors.file}</span>
			{/if} -->
			<button class="btn btn-primary p-2 fw-bold">Upload</button>
		</div>
	</form>
</div>

<style>
	::placeholder {
		color: gray;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
