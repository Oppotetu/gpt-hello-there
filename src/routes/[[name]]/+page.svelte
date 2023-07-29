<script lang="ts">
	// import { ConicGradient } from '@skeletonlabs/skeleton'
	// import type { ConicStop } from '@skeletonlabs/skeleton'

	export let data

	// const conicStops: ConicStop[] = [
	// 	{ color: 'transparent', start: 0, end: 25 },
	// 	{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	// ]
</script>

<div class="container flex grow flex-col items-center mx-auto gap-8 px-2 py-8 text-3xl font-light">
	{#if data.dbGreeting}
		<p>{data.dbGreeting}</p>
	{:else}
		{#await data.streamed.aiGreeting}
			<p class="animate-pulse text-8xl">🤖</p>
			<!-- <ConicGradient stops={conicStops} spin>Loading</ConicGradient> -->
		{:then greeting}
			{greeting}
		{/await}
	{/if}
</div>
