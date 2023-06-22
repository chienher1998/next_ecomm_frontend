<script>
	export let data;
	import SvelteMarkdown from 'svelte-markdown';
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import humanize from 'humanize-plus';
	import axios from 'axios';

	async function getEthToUsdRate() {
		try {
			const response = await axios.get(
				'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
			);
			const ethToUsdRate = response.data.ethereum.usd;
			const ethAmount = data.image.price;
			const res = ethAmount * ethToUsdRate;
			return res;
		} catch (error) {
			console.error('Error fetching ETH to USD rate:', error);
			throw error;
		}
	}

	async function checkOut(id) {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/create-checkout-session/${id}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${getTokenFromLocalStorage()}`
			},
			body: JSON.stringify({ id })
		});
		const res = await resp.json();
		if (resp.status === 200) {
			goto(res);
		}
	}
</script>

<div class="container my-5 text-white d-flex">
	<div>
		<div id="card" class="overflow-hidden rounded-5" style="width:500px; height:600px;">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={data.image.imageFile} alt="image" class="w-100 h-100" style="object-fit:cover" />
		</div>
	</div>
	<div class="ms-5 w-100" style="cursor: default;" >
		<h1>
			{data.image.title}
			<img style="height: 25px;" class="mb-1" src="/icons8-verified-48.png" alt="verified" />
		</h1>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<p>Owned By <label class="text-primary">{data.image.userName}</label></p>
		<SvelteMarkdown source={data.image.desc} />
		<div
			class="p-3 mt-5 rounded-3 shadow"
			style="background-color:#272A2E; border:0.5px solid #353840;"
		>
			<p style="color:#8A939B">Current Price</p>
			<div class="d-flex justify-content-between">
				<div>
					<p class="fw-bold" style="font-size: 2em;">
						<svg
							style="color: white; height: 30px;"
							class="me-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 40 325 512"
							><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
								d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
								fill="white"
							/></svg
						>{humanize.formatNumber(data.image.price, 2)} ETH
					</p>
					{#await getEthToUsdRate()}
						<p style="color:#8A939B">Loading...</p>
					{:then res}
						<p class="ms-1" style="color:#8A939B">$ {humanize.formatNumber(res, 2)}</p>
					{/await}
				</div>
				<button
					class="btn btn-primary fw-bold rounded-4 w-50 me-5"
					style="height: 70px"
					on:click={checkOut(data.image.id)}>Buy now</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	#card::before {
		content: '';
		position: absolute;
		width: 500px;
		height: 600px;
		box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
		z-index: -1;
		animation-name: gradient-shadow;
		animation-timing-function: ease;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		border-radius: 30px;
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
