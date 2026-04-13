export function reveal(node: HTMLElement, options: { threshold?: number; delay?: number } = {}) {
	const { threshold = 0.15, delay = 0 } = options;

	node.classList.add('reveal');
	if (delay > 0) {
		node.style.transitionDelay = `${delay}s`;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('visible');
					observer.unobserve(node);
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
