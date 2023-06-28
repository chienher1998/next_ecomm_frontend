<script>
	export let data;
	import humanize from 'humanize-plus';
	import { getUserId } from '../../../../utils/auth';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getTokenFromLocalStorage } from '../../../../utils/auth';
	import { displayAlert } from '../../../../lib/alert/page';
	import { goto } from '$app/navigation';

	if(!getUserId()){
		goto('/users/login')
	}
	var url = `/NFT/ownerpage/${getUserId}`;

	async function deleteImage(id) {
		console.log(id);
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/image/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getTokenFromLocalStorage()}`
			}
		});
		if (resp.status == 200) {
			displayAlert('Delete Successful !', 'alert-success');
			goto(url);
		} else {
			const res = await resp.json();
			formErrors = res.error;
			throw 'delete failed';
		}
	}
</script>

<div class="container my-5">
	<h3 class="mt-4 mb-3 text-white"><strong>Listing</strong></h3>
	<h6 class="text-secondary d-flex">
		You may edit or delete your listing items from this page <p class="text-secondary ms-2 mb-5">
			<small>*Please confirm your items before proceeding to click delete.</small>
		</p>
	</h6>
	<div class="row">
		
		{#each data.images as image}
			<div class="col-lg-4 col-md-6 mb-4 col-12">
				<div
					class="p-4 m-2 text-white shadow-lg rounded-5 d-flex"
					style="background-color:#303339;"
				>
					<p class="text-secondary ms-2">#{image.id}</p>
					<div class="ms-3 overflow-hidden" style="width: 10rem;">
						<h4>{image.title}</h4>
						<h6 class="text-secondary">
							{humanize.formatNumber(image.price, 2)} ETH
						</h6>
						<div class="mt-3 d-flex">
							<a href="/NFT/ownerpage/{getUserId()}/edit/{image.id}">
								<button class="btn btn-primary me-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="white"
										class="bi bi-pencil-square"
										viewBox="0 0 16 16"
									>
										<path
											d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
										/>
										<path
											fill-rule="evenodd"
											d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
										/>
									</svg>
								</button>
							</a>

							<!-- Button trigger modal -->
							<button
								type="button"
								class="btn btn-danger"
								data-bs-toggle="modal"
								data-bs-target="#delete"
								on:click={deleteImage(image.id)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-trash-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div class="overflow-hidden rounded ms-3" style="height:110px; width:120px">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src={image.imageFile}
							alt={image.imageName}
							class="w-100 h-100 "
							style="object-fit: cover"
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
