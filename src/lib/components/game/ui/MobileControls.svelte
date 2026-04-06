<script lang="ts">
	import { Direction } from '../engine/types';

	interface Props {
		onDirection: (dir: Direction | null) => void;
		onInteract: () => void;
	}

	let { onDirection, onInteract }: Props = $props();

	let activeDir: Direction | null = $state(null);

	function handleDpadDown(dir: Direction) {
		activeDir = dir;
		onDirection(dir);
	}

	function handleDpadUp() {
		activeDir = null;
		onDirection(null);
	}

	function handleTouchStart(e: TouchEvent, dir: Direction) {
		e.preventDefault();
		handleDpadDown(dir);
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault();
		handleDpadUp();
	}
</script>

<div class="pointer-events-none absolute bottom-0 left-0 right-0 z-[300] flex items-end justify-between px-4 pb-6 md:px-6 md:pb-8" style="padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem))">
	<!-- D-pad -->
	<div class="pointer-events-auto relative h-36 w-36 md:h-40 md:w-40">
		<!-- Up -->
		<button
			ontouchstart={(e) => handleTouchStart(e, Direction.UP)}
			ontouchend={handleTouchEnd}
			onmousedown={() => handleDpadDown(Direction.UP)}
			onmouseup={handleDpadUp}
			onmouseleave={handleDpadUp}
			class="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-lg border transition-all md:h-14 md:w-14
				{activeDir === Direction.UP ? 'border-[#D4FF00] bg-[#D4FF00]/30' : 'border-[#333] bg-[#1a1a1a]/80'}"
			aria-label="Move up"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 4L16 12H4L10 4Z" fill={activeDir === Direction.UP ? '#D4FF00' : '#888'} />
			</svg>
		</button>
		<!-- Down -->
		<button
			ontouchstart={(e) => handleTouchStart(e, Direction.DOWN)}
			ontouchend={handleTouchEnd}
			onmousedown={() => handleDpadDown(Direction.DOWN)}
			onmouseup={handleDpadUp}
			onmouseleave={handleDpadUp}
			class="absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-lg border transition-all md:h-14 md:w-14
				{activeDir === Direction.DOWN ? 'border-[#D4FF00] bg-[#D4FF00]/30' : 'border-[#333] bg-[#1a1a1a]/80'}"
			aria-label="Move down"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 16L4 8H16L10 16Z" fill={activeDir === Direction.DOWN ? '#D4FF00' : '#888'} />
			</svg>
		</button>
		<!-- Left -->
		<button
			ontouchstart={(e) => handleTouchStart(e, Direction.LEFT)}
			ontouchend={handleTouchEnd}
			onmousedown={() => handleDpadDown(Direction.LEFT)}
			onmouseup={handleDpadUp}
			onmouseleave={handleDpadUp}
			class="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-lg border transition-all md:h-14 md:w-14
				{activeDir === Direction.LEFT ? 'border-[#D4FF00] bg-[#D4FF00]/30' : 'border-[#333] bg-[#1a1a1a]/80'}"
			aria-label="Move left"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M4 10L12 4V16L4 10Z" fill={activeDir === Direction.LEFT ? '#D4FF00' : '#888'} />
			</svg>
		</button>
		<!-- Right -->
		<button
			ontouchstart={(e) => handleTouchStart(e, Direction.RIGHT)}
			ontouchend={handleTouchEnd}
			onmousedown={() => handleDpadDown(Direction.RIGHT)}
			onmouseup={handleDpadUp}
			onmouseleave={handleDpadUp}
			class="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-lg border transition-all md:h-14 md:w-14
				{activeDir === Direction.RIGHT ? 'border-[#D4FF00] bg-[#D4FF00]/30' : 'border-[#333] bg-[#1a1a1a]/80'}"
			aria-label="Move right"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M16 10L8 16V4L16 10Z" fill={activeDir === Direction.RIGHT ? '#D4FF00' : '#888'} />
			</svg>
		</button>
		<!-- Center dot -->
		<div class="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#222] bg-[#111]/60"></div>
	</div>

	<!-- Action buttons -->
	<div class="pointer-events-auto flex gap-3">
		<button
			ontouchstart={(e) => { e.preventDefault(); onInteract(); }}
			onclick={onInteract}
			class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4FF00] bg-[#D4FF00]/20 font-mono text-lg font-bold text-[#D4FF00] transition-all active:scale-90 active:bg-[#D4FF00]/40 md:h-16 md:w-16"
			aria-label="Interact"
		>
			A
		</button>
	</div>
</div>
