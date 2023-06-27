<script>
	import { alertMessage, alertType } from '../alert/page';
</script>

<div
	id="alertbar"
	class="alert {$alertType} d-flex align-items-center position-fixed"
	role="alert"
>
	{#if $alertType === 'alert-success'}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="currentColor"
			class="bi bi-check-circle-fill"
			viewBox="0 0 16 16"
		>
			<path
				d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="currentColor"
			class="bi bi-x-octagon-fill"
			viewBox="0 0 16 16"
		>
			<path
				d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
			/>
		</svg>
	{/if}
	<div class="ms-3 fw-bold">{$alertMessage}</div>
</div>

<style>
	#alertbar {
		margin-bottom: 0;
		max-width: 50rem;
		left: 50%;
		transform: translate(-50%, 0);
	}
</style>
