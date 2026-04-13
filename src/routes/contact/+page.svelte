<script lang="ts">
	import { cvData } from '$lib/data/cv';

	const { personal } = cvData;

	const contactMethods = [
		{
			label: 'Email',
			value: personal.email,
			href: `mailto:${personal.email}`,
			icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`,
			external: false
		},
		{
			label: 'Phone',
			value: personal.phone ?? '',
			href: `tel:${personal.phone?.replace(/\s/g, '')}`,
			icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>`,
			external: false
		},
		{
			label: 'WhatsApp',
			value: personal.whatsapp ?? '',
			href: `https://wa.me/${personal.whatsapp?.replace(/[\s+]/g, '')}`,
			icon: `<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
			external: true
		},
		{
			label: 'GitHub',
			value: personal.github?.replace('https://', '') ?? '',
			href: personal.github ?? '#',
			icon: `<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
			external: true
		},
		{
			label: 'Slack',
			value: personal.slack ?? '',
			href: personal.slackUrl ?? '#',
			icon: `<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>`,
			external: true
		}
	];
</script>

<svelte:head>
	<title>Contact — Mark Grenville</title>
	<meta name="description" content="Get in touch with Mark Grenville — email, phone, WhatsApp, GitHub, and Slack." />
	<link rel="canonical" href="https://markgrenville.com/contact" />
	<meta property="og:title" content="Contact — Mark Grenville" />
	<meta property="og:description" content="Get in touch with Mark Grenville — email, phone, WhatsApp, GitHub, and Slack." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://markgrenville.com/contact" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Contact — Mark Grenville" />
	<meta name="twitter:description" content="Get in touch with Mark Grenville — email, phone, WhatsApp, GitHub, and Slack." />
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-6 py-20 md:px-12">
	<div class="w-full max-w-2xl">
		<!-- Header -->
		<div class="mb-16 text-center">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">Contact</span>
			<h1 class="mt-4 font-display text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-6xl">
				Get in <span class="text-accent">touch</span>.
			</h1>
			<p class="mx-auto mt-4 max-w-md text-base text-text-secondary">
				Reach out through any of the channels below.
			</p>
		</div>

		<!-- Contact cards -->
		<div class="flex flex-col gap-4">
			{#each contactMethods as method}
				<a
					href={method.href}
					target={method.external ? '_blank' : undefined}
					rel={method.external ? 'noopener noreferrer' : undefined}
					class="group flex items-center gap-5 rounded-xl border border-border/60 bg-surface/50 px-6 py-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface"
				>
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card text-text-muted transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent">
						{@html method.icon}
					</div>
					<div class="min-w-0 flex-1">
						<div class="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
							{method.label}
						</div>
						<div class="mt-1 truncate font-display text-base font-semibold text-text">
							{method.value}
						</div>
					</div>
					{#if method.external}
						<svg class="h-4 w-4 shrink-0 text-text-muted transition-colors duration-300 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
						</svg>
					{/if}
				</a>
			{/each}
		</div>

		<!-- Back link -->
		<div class="mt-12 text-center">
			<a
				href="/"
				class="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-text-muted transition-colors duration-300 hover:text-accent"
			>
				<span>&larr;</span>
				Back to CV
			</a>
		</div>
	</div>
</div>
