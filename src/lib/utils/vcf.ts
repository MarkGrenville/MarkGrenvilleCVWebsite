import type { PersonalInfo } from '$lib/types/cv';

function escapeVcf(value: string): string {
	return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function generateVCard(personal: PersonalInfo): string {
	const nameParts = personal.name.split(' ');
	const lastName = nameParts.pop() ?? '';
	const firstName = nameParts.join(' ');

	const lines = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`FN:${escapeVcf(personal.name)}`,
		`N:${escapeVcf(lastName)};${escapeVcf(firstName)};;;`,
		`TITLE:${escapeVcf(personal.title)}`,
		`EMAIL;TYPE=WORK:${personal.email}`,
		`ADR;TYPE=WORK:;;${escapeVcf(personal.location)};;;;`,
		`NOTE:${escapeVcf(personal.tagline)}`,
		`URL:https://markgrenville.com`,
		'END:VCARD'
	];

	return lines.join('\r\n');
}

export function downloadVCard(personal: PersonalInfo): void {
	const vcf = generateVCard(personal);
	const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = `${personal.name.replace(/\s+/g, '_')}.vcf`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
