<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import MobileMenu from '$lib/components/layout/MobileMenu.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="author" content="Mark Grenville" />
	<meta name="robots" content="index, follow" />
	<link rel="sitemap" href="/sitemap.xml" />
</svelte:head>

<div class="grain min-h-screen bg-base">
	<Sidebar />
	<MobileMenu />

	<main class="lg:ml-64">
		<div class="pt-16 lg:pt-0">
			{@render children()}
		</div>
	</main>
</div>
