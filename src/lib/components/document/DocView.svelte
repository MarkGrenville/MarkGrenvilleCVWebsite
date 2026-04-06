<script lang="ts">
	import { cvData } from '$lib/data/cv';

	function printCV() {
		window.print();
	}
</script>

<div class="min-h-screen bg-[#e8e8e8] p-4 md:p-8 print:bg-white print:p-0">
	<!-- Print button (hidden in print) -->
	<div class="mx-auto mb-6 flex max-w-3xl items-center justify-between print:hidden">
		<div>
			<h1 class="font-display text-lg font-bold text-gray-900">Document View</h1>
			<p class="text-xs text-gray-500">Traditional CV format — print or save as PDF</p>
		</div>
		<button
			onclick={printCV}
			class="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-700"
		>
			Print / Save PDF
		</button>
	</div>

	<!-- Document page -->
	<div class="mx-auto max-w-3xl rounded-lg border border-gray-300 bg-white shadow-xl print:rounded-none print:border-none print:shadow-none">
		<div class="px-12 py-14 print:px-8 print:py-10" style="font-family: 'Inter', 'Georgia', serif; color: #1a1a1a;">
			<!-- Header -->
			<header class="mb-8 border-b-2 border-gray-900 pb-6">
				<h1 class="text-3xl font-bold tracking-tight" style="font-family: 'Space Grotesk', sans-serif;">
					{cvData.personal.name}
				</h1>
				<p class="mt-1 text-lg text-gray-600">{cvData.personal.title}</p>
				<div class="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
					<span>{cvData.personal.location}</span>
					<span>·</span>
					<span>{cvData.personal.email}</span>
				</div>
			</header>

			<!-- Summary -->
			<section class="mb-8">
				<h2 class="mb-3 text-sm font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Professional Summary
				</h2>
				<p class="leading-relaxed text-gray-700">{cvData.personal.summary}</p>
			</section>

			<!-- Experience -->
			<section class="mb-8">
				<h2 class="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Experience
				</h2>
				{#each cvData.experience as entry}
					<div class="mb-6">
						<div class="flex items-baseline justify-between">
							<h3 class="text-base font-bold">{entry.role}</h3>
							<span class="text-sm text-gray-500">{entry.period}</span>
						</div>
						<div class="mb-2 text-sm text-gray-600">{entry.company}</div>
						<p class="mb-3 text-sm leading-relaxed text-gray-700">{entry.description}</p>
						<ul class="flex flex-col gap-1 text-sm text-gray-600">
							{#each entry.highlights as highlight}
								<li class="flex items-start gap-2">
									<span class="mt-1.5 text-[8px]">●</span>
									{highlight}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</section>

			<!-- Skills -->
			<section class="mb-8">
				<h2 class="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Technical Skills
				</h2>
				{#each cvData.skills as category}
					<div class="mb-3">
						<span class="text-sm font-semibold">{category.category}:</span>
						<span class="text-sm text-gray-600">{category.items.join(', ')}</span>
					</div>
				{/each}
			</section>

			<!-- Projects -->
			<section class="mb-8">
				<h2 class="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Selected Projects
				</h2>
				{#each cvData.projects.slice(0, 4) as project}
					<div class="mb-4">
						<h3 class="text-sm font-bold">
							{project.name}
							{#if project.client}
								<span class="font-normal text-gray-500">— {project.client}</span>
							{/if}
						</h3>
						<p class="text-sm text-gray-600">{project.description}</p>
					</div>
				{/each}
			</section>

			<!-- Clients -->
			<section class="mb-8">
				<h2 class="mb-3 text-sm font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Notable Clients
				</h2>
				<p class="text-sm text-gray-600">
					{cvData.clients.map((c) => c.name).join(' · ')}
				</p>
			</section>

			<!-- Footer -->
			<footer class="border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
				{cvData.personal.name} · {cvData.personal.location} · {cvData.personal.email}
			</footer>
		</div>
	</div>
</div>

<style>
	@media print {
		:global(body) {
			background: white !important;
		}
		:global(.grain::after) {
			display: none !important;
		}
		:global(aside),
		:global(header.fixed) {
			display: none !important;
		}
		:global(main) {
			margin-left: 0 !important;
		}
		:global(.pt-16) {
			padding-top: 0 !important;
		}
	}
</style>
