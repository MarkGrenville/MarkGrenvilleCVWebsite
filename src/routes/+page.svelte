<script lang="ts">
	import { viewMode } from '$lib/stores/viewMode';

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
	import YamlView from '$lib/components/yaml/YamlView.svelte';
	import DocView from '$lib/components/document/DocView.svelte';
</script>

{#if $viewMode === 'gui'}
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
{:else if $viewMode === 'cli'}
	<Terminal />
{:else if $viewMode === 'swagger'}
	<SwaggerUI />
{:else if $viewMode === 'json'}
	<JsonView />
{:else if $viewMode === 'yaml'}
	<YamlView />
{:else if $viewMode === 'document'}
	<DocView />
{/if}
