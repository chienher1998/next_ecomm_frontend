<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/sea-green';
	const options = {
		type: 'fade',
		rewind: true,
		perPage: 1,
		mediaQuery: 'max',
		breakpoints: {
			768: {
				destroy: true
			}
		},
		gap: '1rem',
		height: '25rem',
		padding: '1rem',
		autoplay: true,
		interval: 2000
	};
</script>

<Splide {options} aria-label="Svelte Splide Example">
	<SplideSlide>
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src="/pxbanner.png" alt="Image 1" />
	</SplideSlide>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<SplideSlide>
		<img src="/bape.jpg" alt="Image 2" />
	</SplideSlide>
</Splide>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@media only screen and (max-width: 640px){
		img {
		display: none;
	}
	}
</style>
