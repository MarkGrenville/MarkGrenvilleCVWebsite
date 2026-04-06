<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { viewModes } from '$lib/data/cv';

	import Hero from '$lib/components/gui/Hero.svelte';
	import About from '$lib/components/gui/About.svelte';
	import Experience from '$lib/components/gui/Experience.svelte';
	import Skills from '$lib/components/gui/Skills.svelte';
	import Projects from '$lib/components/gui/Projects.svelte';
	import Capabilities from '$lib/components/gui/Capabilities.svelte';
	import Clients from '$lib/components/gui/Clients.svelte';
	import WhyAI from '$lib/components/gui/WhyAI.svelte';
	import Contact from '$lib/components/gui/Contact.svelte';

	import Terminal from '$lib/components/cli/Terminal.svelte';
	import SwaggerUI from '$lib/components/swagger/SwaggerUI.svelte';
	import JsonView from '$lib/components/json/JsonView.svelte';
	import DocView from '$lib/components/document/DocView.svelte';
	import GameView from '$lib/components/game/GameView.svelte';
	import PersonaCard from '$lib/components/card/PersonaCard.svelte';
	import ChatView from '$lib/components/chat/ChatView.svelte';

	let { data } = $props();

	const modeInfo = $derived(viewModes.find((m) => m.id === data.mode));
	const title = $derived(
		data.mode === 'gui'
			? `${cvData.personal.name} — ${cvData.personal.title}`
			: `${modeInfo?.label ?? 'CV'} — ${cvData.personal.name}`
	);
	const description = $derived(
		data.mode === 'gui'
			? cvData.personal.summary.substring(0, 160)
			: `View ${cvData.personal.name}'s CV in ${modeInfo?.description?.toLowerCase() ?? 'a unique'} format.`
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://markgrenville.com{data.mode === 'gui' ? '' : `/${data.mode}`}" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://markgrenville.com{data.mode === 'gui' ? '' : `/${data.mode}`}" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

{#if data.mode === 'gui'}
	<div class="transition-opacity duration-500">
		<Hero />
		<About />
		<Experience />
		<Skills />
		<Projects />
		<Capabilities />
		<Clients />
		<WhyAI />
		<Contact />
	</div>
{:else if data.mode === 'cli'}
	<Terminal />
{:else if data.mode === 'swagger'}
	<SwaggerUI />
{:else if data.mode === 'json'}
	<JsonView />
{:else if data.mode === 'document'}
	<DocView />
{:else if data.mode === 'game'}
	<GameView />
{:else if data.mode === 'card'}
	<PersonaCard />
{:else if data.mode === 'chat'}
	<ChatView />
{/if}
