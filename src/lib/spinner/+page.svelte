<script>
	import { _statusSpinner } from './+page';
</script>

{#if $_statusSpinner}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
{/if}
