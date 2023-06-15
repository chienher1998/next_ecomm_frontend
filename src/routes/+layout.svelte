<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import  Navbar  from '../lib/nav/+page.svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<html lang="en" >
	<head>
		<title>PixelVault</title>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
	</head>
	<Navbar />
	<slot />
</html>

<style>
	:global(body) {
		background-color: #212529;
	}
</style>
