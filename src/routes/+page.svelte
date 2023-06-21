<script>
	export let data;

	function calDate(input) {
		const creationDate = new Date(input);
		const currentDate = new Date();
		const timeDiff = currentDate - creationDate; //returns miliseconds

		let timeElapsed;
		if (timeDiff >= 86400000) {
			//a day 24hrs in miliseconds
			// If more than 24 hours have passed, display the number of days
			const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); //24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 86400000 milliseconds
			timeElapsed = `${daysDiff} day ago`;
		} else if (timeDiff >= 3600000) {
			//convert 60mins to miliseconds
			// If more than 1 hour has passed, display the number of hours
			const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
			timeElapsed = `${hoursDiff} hours ago`;
		} else if (timeDiff >= 60000) {
			//convert 60sec to miliseconds
			// If more than 1 minute has passed, display the number of minutes
			const minutesDiff = Math.floor(timeDiff / (1000 * 60));
			timeElapsed = `${minutesDiff} miniutes ago`;
		} else {
			// Display the number of seconds
			const secondsDiff = Math.floor(timeDiff / 1000);
			timeElapsed = `${secondsDiff} seconds ago `;
		}

		return timeElapsed;
	}
</script>

<!-- <svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head> -->

<div class="text-center container py-5 vh-100 text-light">
	<h4 class="mt-4 mb-5"><strong>Top Collectibles</strong></h4>

	<div class="row">
		{#each data.images as image}
			<div class="col-lg-4 col-md-6 mb-4 col-12">
				<div class="card text-start shadow rounded-5 text-light" style="background-color:#303339;">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a href="/NFT/{image.id}" class="overflow-hidden rounded-top-5" style="height:300px;">
						<img src={image.imageFile} class="w-100 h-100" style="object-fit: cover" />
					</a>
					<div class="card-body d-flex">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<div class="me-auto overflow-hidden" style="width: 70%;">
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
								>{image.price} ETH
							</h6>
							<p class="text-secondary">{calDate(image.createdAt)}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	img {
		transition: 0.3s ease;
	}
	img:hover {
		transform: scale(1.2); /* Enlarge the card on hover */
	}
	.card:hover:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
		z-index: -1;
		animation-name: gradient-shadow;
		animation-timing-function: ease;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		border-radius: 35px;
	}
	@-webkit-keyframes yellow-shadow {
		0% {
			top: 0;
			left: 0;
		}
		25% {
			top: 50%;
			left: 0;
		}
		50% {
			top: 50%;
			left: 50%;
		}
		75% {
			top: 0;
			left: 50%;
		}
		100% {
			top: 0;
			left: 0;
		}
	}

	@keyframes yellow-shadow {
		0% {
			top: 0;
			left: 0;
		}
		25% {
			top: 50%;
			left: 0;
		}
		50% {
			top: 50%;
			left: 50%;
		}
		75% {
			top: 0;
			left: 50%;
		}
		100% {
			top: 0;
			left: 0;
		}
	}

	@-webkit-keyframes cyan-shadow {
		0% {
			right: 0;
			bottom: 0;
		}
		25% {
			right: 0;
			bottom: 50%;
		}
		50% {
			right: 50%;
			bottom: 50%;
		}
		75% {
			right: 50%;
			bottom: 0;
		}
		100% {
			right: 0;
			bottom: 0;
		}
	}

	@keyframes cyan-shadow {
		0% {
			right: 0;
			bottom: 0;
		}
		25% {
			right: 0;
			bottom: 50%;
		}
		50% {
			right: 50%;
			bottom: 50%;
		}
		75% {
			right: 50%;
			bottom: 0;
		}
		100% {
			right: 0;
			bottom: 0;
		}
	}

	@-webkit-keyframes gradient-shadow {
		0% {
			-webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
			box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
		}
		20% {
			-webkit-box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
			box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
		}
		40% {
			-webkit-box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
			box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
		}
		60% {
			-webkit-box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
			box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
		}
		80% {
			-webkit-box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
			box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
		}
		100% {
			-webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
			box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
		}
	}

	@keyframes gradient-shadow {
		0% {
			-webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
			box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
		}
		20% {
			-webkit-box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
			box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
		}
		40% {
			-webkit-box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
			box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
		}
		60% {
			-webkit-box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
			box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
		}
		80% {
			-webkit-box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
			box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
		}
		100% {
			-webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
			box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
		}
	}

	@-webkit-keyframes half-yellow-shadow {
		0% {
			top: 0;
			left: 0;
			height: 50%;
			width: 50%;
		}
		16.66% {
			top: 0;
			left: 0;
			height: 50%;
			width: 100%;
		}
		32.32% {
			top: 0;
			left: 50%;
			height: 50%;
			width: 50%;
		}
		49.98% {
			top: 50%;
			left: 50%;
			height: 50%;
			width: 50%;
		}
		66.64% {
			top: 50%;
			left: 0;
			height: 50%;
			width: 100%;
		}
		83.3% {
			top: 50%;
			left: 0;
			height: 50%;
			width: 50%;
		}
		100% {
			top: 0;
			left: 0;
			height: 50%;
			width: 50%;
		}
	}

	@keyframes half-yellow-shadow {
		0% {
			top: 0;
			left: 0;
			height: 50%;
			width: 50%;
		}
		16.66% {
			top: 0;
			left: 0;
			height: 50%;
			width: 100%;
		}
		32.32% {
			top: 0;
			left: 50%;
			height: 50%;
			width: 50%;
		}
		49.98% {
			top: 50%;
			left: 50%;
			height: 50%;
			width: 50%;
		}
		66.64% {
			top: 50%;
			left: 0;
			height: 50%;
			width: 100%;
		}
		83.3% {
			top: 50%;
			left: 0;
			height: 50%;
			width: 50%;
		}
		100% {
			top: 0;
			left: 0;
			height: 50%;
			width: 50%;
		}
	}

	@-webkit-keyframes half-cyan-shadow {
		0% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 50%;
		}
		16.66% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 100%;
		}
		32.32% {
			bottom: 0;
			right: 50%;
			height: 50%;
			width: 50%;
		}
		49.98% {
			bottom: 50%;
			right: 50%;
			height: 50%;
			width: 50%;
		}
		66.64% {
			bottom: 50%;
			right: 0;
			height: 50%;
			width: 100%;
		}
		83.3% {
			bottom: 50%;
			right: 0;
			height: 50%;
			width: 50%;
		}
		100% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 50%;
		}
	}

	@keyframes half-cyan-shadow {
		0% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 50%;
		}
		16.66% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 100%;
		}
		32.32% {
			bottom: 0;
			right: 50%;
			height: 50%;
			width: 50%;
		}
		49.98% {
			bottom: 50%;
			right: 50%;
			height: 50%;
			width: 50%;
		}
		66.64% {
			bottom: 50%;
			right: 0;
			height: 50%;
			width: 100%;
		}
		83.3% {
			bottom: 50%;
			right: 0;
			height: 50%;
			width: 50%;
		}
		100% {
			bottom: 0;
			right: 0;
			height: 50%;
			width: 50%;
		}
	}
</style>
