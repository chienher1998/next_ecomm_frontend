<script>
	export let data;
	import humanize from 'humanize-plus';
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="text-center container py-5 vh-100 text-light">
	<h4 class="mt-4 mb-5"><strong>Top Collectibles</strong></h4>

	<div class="row">
		{#each data.images as image}
			<div class="col-lg-4 col-md-6 mb-4 col-12">
				<div class="card text-start shadow rounded-5 text-light " style="background-color:#303339;">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a href="#!" class="overflow-hidden rounded-top-5" style="height:300px;" >
						<img src={image.imageFile} class="w-100 h-100" style=" object-fit: cover"  />
					</a>
					<div class="card-body d-flex">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<div class="me-auto">
							<a href="" class="text-reset text-decoration-none">
								<h5 class="card-title mb-2 fw-bold">
									{image.title}
									<img
										style="height: 20px;"
										class="mb-1"
										src="icons8-verified-48.png"
										alt="verified"
									/>
								</h5>
							</a>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="" class="text-reset text-decoration-none">
								<p>{image.userName}</p>
							</a>
						</div>
						<div class="">
							<h6 class="mb-3 fw-bold">
								<svg
									style="color: white; height: 16px;"
									class="me-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 40 325 512"
									><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
										d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
										fill="white"
									/></svg
								>{humanize.formatNumber(image.price)} ETH
							</h6>
							<p class="text-secondary">2 days ago</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
