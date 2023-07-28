<script lang="ts">
	import '../solarized.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'
	import { page } from '$app/stores'
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'

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
				<a href="/">Home</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<p>link</p>
				<p>link</p>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
