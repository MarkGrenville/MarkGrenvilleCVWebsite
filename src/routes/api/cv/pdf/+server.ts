import type { RequestHandler } from './$types';
import { cvData } from '$lib/data/cv';
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions, Content, TableCell } from 'pdfmake/interfaces';

pdfmake.fonts = {
	Helvetica: {
		normal: 'Helvetica',
		bold: 'Helvetica-Bold',
		italics: 'Helvetica-Oblique',
		bolditalics: 'Helvetica-BoldOblique'
	}
};

function buildDocDefinition(): TDocumentDefinitions {
	const { personal, experience, skills, projects, capabilities, clients } = cvData;

	const sectionHeader = (text: string): Content => ({
		text: text.toUpperCase(),
		style: 'sectionHeader',
		margin: [0, 14, 0, 6]
	});

	const experienceContent: Content[] = experience.flatMap((entry) => [
		{
			columns: [
				{ text: entry.role, style: 'jobTitle', width: '*' },
				{ text: entry.period, style: 'period', width: 'auto', alignment: 'right' as const }
			],
			margin: [0, 0, 0, 2] as [number, number, number, number]
		},
		{ text: entry.company, style: 'company', margin: [0, 0, 0, 4] as [number, number, number, number] },
		{ text: entry.description, style: 'body', margin: [0, 0, 0, 6] as [number, number, number, number] },
		{
			ul: entry.highlights.map((h) => ({ text: h, style: 'body' })),
			margin: [0, 0, 0, 10] as [number, number, number, number]
		}
	]);

	const skillsContent: Content[] = skills.map((cat) => ({
		text: [
			{ text: `${cat.category}: `, bold: true, fontSize: 9 },
			{ text: cat.items.join(', '), fontSize: 9, color: '#444444' }
		],
		margin: [0, 0, 0, 3] as [number, number, number, number]
	}));

	const projectRows: TableCell[][] = [];
	for (let i = 0; i < projects.length; i += 2) {
		const left = projects[i];
		const right = projects[i + 1];
		projectRows.push([
			{
				stack: [
					{
						text: left.client ? `${left.name} — ${left.client}` : left.name,
						bold: true,
						fontSize: 9
					},
					{ text: left.description, fontSize: 8, color: '#444444', margin: [0, 2, 0, 2] as [number, number, number, number] },
					{ text: left.tech.join(' · '), fontSize: 7.5, color: '#888888' }
				],
				margin: [0, 0, 8, 8] as [number, number, number, number]
			},
			right
				? {
						stack: [
							{
								text: right.client ? `${right.name} — ${right.client}` : right.name,
								bold: true,
								fontSize: 9
							},
							{ text: right.description, fontSize: 8, color: '#444444', margin: [0, 2, 0, 2] as [number, number, number, number] },
							{ text: right.tech.join(' · '), fontSize: 7.5, color: '#888888' }
						],
						margin: [0, 0, 0, 8] as [number, number, number, number]
					}
				: { text: '' }
		]);
	}

	const capRows: TableCell[][] = [];
	for (let i = 0; i < capabilities.length; i += 2) {
		const left = capabilities[i];
		const right = capabilities[i + 1];
		capRows.push([
			{
				stack: [
					{ text: left.label, bold: true, fontSize: 9 },
					{ text: left.items.join(' · '), fontSize: 8, color: '#444444' }
				],
				margin: [0, 0, 8, 6] as [number, number, number, number]
			},
			right
				? {
						stack: [
							{ text: right.label, bold: true, fontSize: 9 },
							{ text: right.items.join(' · '), fontSize: 8, color: '#444444' }
						],
						margin: [0, 0, 0, 6] as [number, number, number, number]
					}
				: { text: '' }
		]);
	}

	const docDefinition: TDocumentDefinitions = {
		defaultStyle: {
			font: 'Helvetica',
			fontSize: 9.5,
			lineHeight: 1.35,
			color: '#1a1a1a'
		},
		pageSize: 'A4',
		pageMargins: [54, 45, 54, 40],
		styles: {
			sectionHeader: {
				fontSize: 8,
				bold: true,
				color: '#999999',
				letterSpacing: 1.5
			},
			jobTitle: {
				fontSize: 10,
				bold: true
			},
			period: {
				fontSize: 8,
				color: '#666666'
			},
			company: {
				fontSize: 8.5,
				color: '#444444'
			},
			body: {
				fontSize: 9,
				color: '#333333',
				lineHeight: 1.4
			}
		},
		content: [
			// --- PAGE 1 ---
			// Header
			{ text: personal.name, fontSize: 22, bold: true, margin: [0, 0, 0, 3] },
			{ text: personal.title, fontSize: 10, color: '#666666', margin: [0, 0, 0, 6] },
			{
				text: [
					personal.location,
					'  ·  ',
					personal.email,
					'  ·  ',
					'github.com/MarkGrenville'
				].join(''),
				fontSize: 8.5,
				color: '#888888',
				margin: [0, 0, 0, 4]
			},
			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 487, y2: 0, lineWidth: 1.5, lineColor: '#1a1a1a' }],
				margin: [0, 0, 0, 0]
			},

			// Professional Summary
			sectionHeader('Professional Summary'),
			{ text: personal.summary, style: 'body' },

			// Experience
			sectionHeader('Experience'),
			...experienceContent,

			// Technical Skills
			sectionHeader('Technical Skills'),
			...skillsContent,

			// --- PAGE 2 ---
			{ text: '', pageBreak: 'after' },

			// Selected Projects
			sectionHeader('Selected Projects'),
			{
				table: {
					widths: ['*', '*'],
					body: projectRows
				},
				layout: 'noBorders'
			},

			// Capabilities
			sectionHeader('Capabilities'),
			{
				table: {
					widths: ['*', '*'],
					body: capRows
				},
				layout: 'noBorders'
			},

			// Notable Clients
			sectionHeader('Notable Clients'),
			{
				text: clients.map((c) => c.name).join(' · '),
				fontSize: 9,
				color: '#444444',
				margin: [0, 0, 0, 10]
			},

			// Why AI
			sectionHeader('Why AI — Career Direction'),
			{
				text: 'After 13 years of entrepreneurship building digital systems, I am now seeking to join a leading AI organisation. The greatest impact I can have lies within companies shaping AI at global scale — contributing technical depth, entrepreneurial ownership, and practical execution where the reach is greatest and the work has the potential to improve productivity at massive scale.',
				style: 'body'
			}
		],
		footer: (currentPage: number, pageCount: number) => ({
			columns: [
				{
					text: `${personal.name}  ·  ${personal.location}  ·  ${personal.email}  ·  github.com/MarkGrenville`,
					alignment: 'center' as const,
					fontSize: 7.5,
					color: '#aaaaaa',
					margin: [54, 10, 54, 0] as [number, number, number, number]
				}
			]
		})
	};

	return docDefinition;
}

async function generatePdf(docDefinition: TDocumentDefinitions): Promise<Buffer> {
	const doc = pdfmake.createPdf(docDefinition);
	return await doc.getBuffer();
}

export const GET: RequestHandler = async () => {
	try {
		const docDefinition = buildDocDefinition();
		const pdfBuffer = await generatePdf(docDefinition);

		return new Response(pdfBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="Mark_Grenville_CV.pdf"',
				'Content-Length': pdfBuffer.length.toString()
			}
		});
	} catch (err) {
		console.error('[API] PDF generation failed:', err);
		return new Response(JSON.stringify({ error: 'PDF generation failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
