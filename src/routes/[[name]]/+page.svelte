<script lang="ts">
	import { goto } from '$app/navigation'

	export let data

	let name: string

	function typewriter(node: any, { speed = 5 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`)
		}

		const text = node.textContent
		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t: any) => {
				const i = Math.trunc(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
</script>

<div class="container flex grow flex-col items-center mx-auto gap-8 px-2 py-8 text-3xl font-light">
	{#if data.dbGreeting}
		<p>{data.dbGreeting}</p>
	{:else}
		{#await data.streamed.aiGreeting}
			<p class="animate-pulse text-8xl">🤖</p>
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
	<button type="submit" class="btn text-surface-50 w-full bg-secondary-500">Greet me!</button>
</form>
