<script lang="ts">
	import { goto } from '$app/navigation'

	// import { ConicGradient } from '@skeletonlabs/skeleton'
	// import type { ConicStop } from '@skeletonlabs/skeleton'

	export let data

	let name: string

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

<form
	on:submit|preventDefault={() => {
		if (name) {
			goto(name)
		}
	}}
	class="card space-y-2 w-64 mx-auto p-4 mt-4 md:mt-10"
>
	<label class="label">
		<span>🤖 What is your name?</span>
		<input bind:value={name} class="input input-success" type="text" placeholder="Name" />
	</label>
	<button type="submit" class="btn w-full bg-secondary-500">Ok</button>
</form>
