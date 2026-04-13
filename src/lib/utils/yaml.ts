export function toYaml(obj: unknown, indent = 0): string {
	const pad = '  '.repeat(indent);

	if (obj === null || obj === undefined) return `${pad}null\n`;
	if (typeof obj === 'boolean') return `${pad}${obj}\n`;
	if (typeof obj === 'number') return `${pad}${obj}\n`;

	if (typeof obj === 'string') {
		if (obj.includes('\n')) {
			const lines = obj.split('\n');
			return `${pad}|\n${lines.map((l) => `${pad}  ${l}`).join('\n')}\n`;
		}
		if (obj.match(/[:#{}[\],&*?|>!%@`]/)) {
			return `${pad}"${obj.replace(/"/g, '\\"')}"\n`;
		}
		return `${pad}${obj}\n`;
	}

	if (Array.isArray(obj)) {
		if (obj.length === 0) return `${pad}[]\n`;
		return obj.map((item) => {
			if (typeof item === 'object' && item !== null) {
				const inner = toYaml(item, indent + 1).trimStart();
				return `${pad}- ${inner}`;
			}
			return `${pad}- ${String(item)}\n`;
		}).join('');
	}

	if (typeof obj === 'object') {
		const entries = Object.entries(obj as Record<string, unknown>);
		if (entries.length === 0) return `${pad}{}\n`;
		return entries.map(([key, val]) => {
			if (typeof val === 'object' && val !== null) {
				return `${pad}${key}:\n${toYaml(val, indent + 1)}`;
			}
			return `${pad}${key}: ${toYaml(val, 0).trim()}\n`;
		}).join('');
	}

	return `${pad}${String(obj)}\n`;
}
