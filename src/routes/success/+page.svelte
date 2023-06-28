<script>
	import { goto } from '$app/navigation';
</script>

<div class="container bg-light rounded p-5">
	<p>
		Your purchase has been completed ! If you have any questions, please email
		<a href="mailto:orders@example.com">customerservice.my@pixelvault.com</a>.
	</p>
    <button class="btn btn-success mt-3 w-100" on:click={()=>{goto('/')}}>Go to Home Page</button>
</div>

<style>
	div {
		width: 28%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
