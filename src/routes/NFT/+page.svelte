<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { uploadMedia } from '../../utils/s3-uploader';
	import { getTokenFromLocalStorage } from '../../utils/auth.js';

	let formErrors = {};

	async function uploadImage(evt) {
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
		console.log(fileUrl);
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
			console.log('post image succeed');
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

<div class="container">
	<form on:submit|preventDefault={uploadImage} class="text-white">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Image Title</label>
			<input type="text" class="form-control" name="imageTitle" placeholder="Name your NFT">
		  </div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">Description</label>
			<textarea class="form-control" name="desc" rows="3" placeholder="Enter your description" />
		</div>
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Price</label>
			<input type="number" class="form-control" name="price" placeholder="Enter your price" step=".01">
		  </div>

		<input type="file" name="file" />
		<!-- {#if 'file' in formErrors}
			<span class="text-danger">{formErrors.file}</span>
		{/if} -->
		<button class="btn-primary">Upload</button>
	</form>
</div>
