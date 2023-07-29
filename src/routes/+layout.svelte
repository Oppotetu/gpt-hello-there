<script lang="ts">
	import '../solarized.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'
	import { page } from '$app/stores'
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'

	export let data

	$: title = $page.data.meta?.title ?? data.defaultMeta.title
	$: description = $page.data.meta?.description ?? data.defaultMeta.description

	// $: image = $page.data.meta?.image ?? data.defaultMeta.image
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Greeting of the day" />
	<meta property="og:url" content={$page.url.href} />

	<!-- <meta property="og:image" content={image.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:alt" content={image.alt} /> -->
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="a text-2xl" href="/">Home</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<div
			class="container flex grow flex-col items-center mx-auto gap-8 px-2 py-8 text-md font-light"
		>
			{#if $page.url.pathname == '/'}
				<p class="text-xl">
					Go to <a class="a" href="yourname">www.localhost.no/yourname</a> for a personalized ai generated
					greeting.
				</p>
			{/if}
			<p>This site is based on a youtube tutorial by Johnny Magrippis</p>
		</div>
	</svelte:fragment>
</AppShell>
