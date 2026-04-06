<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import MobileMenu from '$lib/components/layout/MobileMenu.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mark Grenville — Software Engineer & Digital Systems Builder</title>
	<meta name="description" content="CV of Mark Grenville — 13+ years building custom software, platforms, AI workflows, and digital systems." />
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
