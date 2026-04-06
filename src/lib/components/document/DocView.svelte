<script lang="ts">
	import { cvData } from '$lib/data/cv';

	function printCV() {
		window.print();
	}
</script>

<div class="min-h-screen bg-[#e8e8e8] p-4 md:p-8 print:bg-white print:p-0">
	<!-- Print button (hidden in print) -->
	<div class="mx-auto mb-6 flex max-w-5xl items-center justify-between print:hidden">
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

	<!-- Document pages container -->
	<div class="mx-auto max-w-5xl rounded-lg border border-gray-300 bg-white shadow-xl print:rounded-none print:border-none print:shadow-none">
		<!-- Page 1 -->
		<div class="cv-page px-14 pt-12 pb-8 print:px-[0.75in] print:pt-[0.6in] print:pb-[0.4in]" style="font-family: 'Inter', 'Georgia', serif; color: #1a1a1a;">
			<!-- Header -->
			<header class="mb-6 border-b-2 border-gray-900 pb-4">
				<h1 class="text-3xl font-bold tracking-tight" style="font-family: 'Space Grotesk', sans-serif;">
					{cvData.personal.name}
				</h1>
				<p class="mt-1 text-base text-gray-600">{cvData.personal.title}</p>
				<div class="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
					<span>{cvData.personal.location}</span>
					<span>·</span>
					<span>{cvData.personal.email}</span>
					<span>·</span>
					<a href="https://github.com/MarkGrenville" class="text-gray-500 hover:text-gray-900">github.com/MarkGrenville</a>
				</div>
			</header>

			<!-- Summary -->
			<section class="mb-5">
				<h2 class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Professional Summary
				</h2>
				<p class="text-[13px] leading-relaxed text-gray-700">{cvData.personal.summary}</p>
			</section>

			<!-- Experience -->
			<section class="mb-5">
				<h2 class="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Experience
				</h2>
				{#each cvData.experience as entry}
					<div class="mb-4">
						<div class="flex items-baseline justify-between">
							<h3 class="text-sm font-bold">{entry.role}</h3>
							<span class="text-xs text-gray-500">{entry.period}</span>
						</div>
						<div class="mb-1.5 text-xs text-gray-600">{entry.company}</div>
						<p class="mb-2 text-[12px] leading-relaxed text-gray-700">{entry.description}</p>
						<ul class="flex flex-col gap-0.5 text-[12px] text-gray-600">
							{#each entry.highlights as highlight}
								<li class="flex items-start gap-2">
									<span class="mt-1 text-[6px]">●</span>
									{highlight}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</section>

			<!-- Skills -->
			<section class="mb-5">
				<h2 class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Technical Skills
				</h2>
				{#each cvData.skills as category}
					<div class="mb-1.5">
						<span class="text-[12px] font-semibold">{category.category}:</span>
						<span class="text-[12px] text-gray-600">{category.items.join(', ')}</span>
					</div>
				{/each}
			</section>
		</div>

		<!-- Page break -->
		<div class="border-t-2 border-dashed border-gray-300 print:border-none"></div>

		<!-- Page 2 -->
		<div class="cv-page px-14 pt-10 pb-8 print:px-[0.75in] print:pt-[0.6in] print:pb-[0.4in]" style="font-family: 'Inter', 'Georgia', serif; color: #1a1a1a;">
			<!-- Projects -->
			<section class="mb-5">
				<h2 class="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Selected Projects
				</h2>
				<div class="grid grid-cols-2 gap-x-8 gap-y-4">
					{#each cvData.projects as project}
						<div>
							<h3 class="text-[12px] font-bold">
								{project.name}
								{#if project.client}
									<span class="font-normal text-gray-500">— {project.client}</span>
								{/if}
							</h3>
							<p class="text-[11px] leading-relaxed text-gray-600">{project.description}</p>
							<p class="mt-1 text-[10px] text-gray-400">{project.tech.join(' · ')}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Capabilities -->
			<section class="mb-5">
				<h2 class="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Capabilities
				</h2>
				<div class="grid grid-cols-2 gap-x-8 gap-y-3">
					{#each cvData.capabilities as cap}
						<div>
							<h3 class="text-[12px] font-bold">{cap.label}</h3>
							<p class="text-[11px] text-gray-600">{cap.items.join(' · ')}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Clients -->
			<section class="mb-5">
				<h2 class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Notable Clients
				</h2>
				<p class="text-[12px] text-gray-600">
					{cvData.clients.map((c) => c.name).join(' · ')}
				</p>
			</section>

			<!-- Why AI -->
			<section class="mb-5">
				<h2 class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase" style="font-family: 'Space Grotesk', sans-serif;">
					Why AI — Career Direction
				</h2>
				<p class="text-[12px] leading-relaxed text-gray-700">
					After 13 years of entrepreneurship building digital systems, I am now seeking to join a leading AI organisation. The greatest impact I can have lies within companies shaping AI at global scale — contributing technical depth, entrepreneurial ownership, and practical execution where the reach is greatest and the work has the potential to improve productivity at massive scale.
				</p>
			</section>

			<!-- Footer -->
			<footer class="mt-auto border-t border-gray-200 pt-3 text-center text-[10px] text-gray-400">
				{cvData.personal.name} · {cvData.personal.location} · {cvData.personal.email} · github.com/MarkGrenville
			</footer>
		</div>
	</div>
</div>

<style>
	@page {
		size: A4;
		margin: 0;
	}

	@media print {
		:global(body) {
			background: white !important;
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
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

		.cv-page {
			width: 210mm;
			min-height: 297mm;
			max-height: 297mm;
			overflow: hidden;
			page-break-after: always;
			box-sizing: border-box;
		}

		.cv-page:last-child {
			page-break-after: auto;
		}
	}
</style>
