<script lang="ts">
	export let data

	let { greeting } = data
</script>

<div
	class="container flex grow flex-col items-center justify-center gap-8 px-2 py-8 text-3xl font-light"
>
	<p>{greeting}</p>
</div>
<!-- <pre>
  {JSON.stringify(data, null, 2)}
</pre> -->
