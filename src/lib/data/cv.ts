import type { CVData, ViewModeOption } from '$lib/types/cv';

export const viewModes: ViewModeOption[] = [
	{
		id: 'gui',
		label: 'GUI',
		icon: '◉',
		description: 'Visual interface'
	},
	{
		id: 'cli',
		label: 'CLI',
		icon: '>_',
		description: 'Terminal'
	},
	{
		id: 'swagger',
		label: 'Swagger',
		icon: '{ }',
		description: 'API Explorer'
	},
	{
		id: 'json',
		label: 'JSON',
		icon: '[ ]',
		description: 'Raw data'
	},
	{
		id: 'yaml',
		label: 'YAML',
		icon: '---',
		description: 'Structured'
	},
	{
		id: 'document',
		label: 'Document',
		icon: '⎙',
		description: 'Printable'
	}
];

export const cvData: CVData = {
	personal: {
		name: 'Mark Grenville',
		title: 'Software Engineer & Digital Systems Builder',
		location: 'Johannesburg, South Africa',
		email: 'info@webfootprint.co.za',
		tagline: 'Building technology that makes people and businesses more capable.',
		summary:
			'Senior digital systems builder with 13+ years of hands-on experience across custom software, web platforms, business automation, AI-assisted workflows, and interactive digital products. I operate at the intersection of business need, technical implementation, and workflow design — helping organisations turn complex operational challenges into practical, scalable digital systems.',
		profileImage: '/profile-pic.jpg'
	},

	experience: [
		{
			company: 'WebFootprint',
			role: 'Founder & Lead Engineer',
			period: '2012 — Present',
			description:
				'Founded and led a digital systems consultancy serving South African businesses across automotive, property, logistics, retail, finance, and entertainment. Built and delivered 20+ platforms spanning websites, custom software, e-commerce, 3D configurators, CRM systems, AI tools, and marketing automation.',
			highlights: [
				'Powered Toyota South Africa\'s vehicle configurator for 6+ years across Rav4, Fortuner, Hilux, and more',
				'Architected ParkUpp — a multi-role monthly parking platform with portfolio management, subscription lifecycle, and revenue tracking',
				'Built 3D vehicle configurators for Front Runner Outfitters and multiple OEMs using Three.js',
				'Designed and shipped AI-assisted admin systems, OCR-based document processing, and LLM-powered chatbot workflows',
				'Delivered systems for Discovery, Cell C, DStv, MiWay, Mahindra, and international organisations (EU, American Chamber of Commerce)',
				'Integrated marketing systems: SEO, Google Ads, email automation, WhatsApp chatbots, and lead generation engines',
				'Led a lean multidisciplinary team spanning development, 3D art, design, marketing, video, and photography'
			]
		},
		{
			company: 'Publishing Company',
			role: 'Digital Systems & Marketing',
			period: 'Early Career',
			description:
				'Worked in a high-scale publishing environment reaching large audiences and processing hundreds of thousands of emails per month across substantial databases. Built foundational understanding of digital reach, systems at scale, and communicating with large numbers of people through technology.',
			highlights: [
				'Managed large-scale email systems processing hundreds of thousands of messages monthly',
				'Developed understanding of digital systems at scale and audience engagement mechanics',
				'Built foundation in data-driven marketing and systematic communication workflows'
			]
		}
	],

	skills: [
		{
			category: 'Languages & Frameworks',
			items: [
				'TypeScript',
				'JavaScript',
				'Python',
				'Angular',
				'SvelteKit',
				'Django',
				'Node.js',
				'Flutter',
				'Three.js'
			]
		},
		{
			category: 'Platforms & Infrastructure',
			items: [
				'Firebase / Firestore',
				'Google Cloud',
				'WordPress',
				'WooCommerce',
				'Shopify',
				'Apache',
				'PM2',
				'Docker'
			]
		},
		{
			category: 'AI & Automation',
			items: [
				'OpenAI / ChatGPT API',
				'LLM Integration',
				'Whisper (Speech-to-Text)',
				'OCR & Document Processing',
				'AI Chatbot Workflows',
				'Prompt Engineering',
				'Agentic Development',
				'Workflow Automation'
			]
		},
		{
			category: 'Marketing & Growth',
			items: [
				'SEO & GEO (AI Search)',
				'Google Ads & Shopping',
				'Email Automation',
				'WhatsApp Automation',
				'Lead Generation Systems',
				'CRM & Sales Pipelines',
				'Analytics & Reporting',
				'Conversion Optimisation'
			]
		},
		{
			category: 'Domains',
			items: [
				'SaaS / Platform Architecture',
				'E-commerce Systems',
				'3D Product Configurators',
				'CRM & Admin Portals',
				'Logistics & Inventory',
				'Payment Systems',
				'Real-time Databases',
				'White-label Products'
			]
		}
	],

	projects: [
		{
			name: 'Toyota Vehicle Configurator',
			client: 'Toyota South Africa',
			description:
				'Powered Toyota\'s interactive 3D vehicle configurator for 6+ years. Users could explore and customise vehicles including Rav4, Fortuner, Hilux, and more with real-time visualisation of accessories and options.',
			tech: ['Three.js', 'JavaScript', 'WebGL', '3D Modelling'],
			highlights: [
				'6+ year partnership with Toyota SA',
				'Multiple vehicle models supported',
				'Real-time 3D rendering and accessory configuration',
				'Mobile-responsive interactive experience'
			]
		},
		{
			name: 'ParkUpp',
			client: 'ParkUpp',
			description:
				'A monthly parking platform and aggregator connecting landlords, merchants, portfolios, and parkers. Multi-role system with subscription lifecycle, revenue tracking, occupancy monitoring, and portfolio-level reporting.',
			tech: ['Angular', 'Firebase', 'Node.js', 'PayGate'],
			highlights: [
				'Multi-stakeholder platform (landlords, merchants, parkers, admins)',
				'Subscription lifecycle and automated billing',
				'Portfolio-level reporting and occupancy tracking',
				'White-label architecture considerations'
			]
		},
		{
			name: 'Front Runner 3D Configurator',
			client: 'Front Runner Outfitters',
			description:
				'Interactive 3D vehicle accessory configurator for Front Runner Outfitters. Users could visualise roof racks, camping gear, and accessories on their specific vehicle model in real-time.',
			tech: ['Three.js', 'WebGL', 'JavaScript', 'REST APIs'],
			highlights: [
				'Real-time 3D accessory visualisation',
				'Vehicle-specific product compatibility',
				'Interactive product exploration experience'
			]
		},
		{
			name: 'MySky Networks CRM',
			client: 'MySky Networks',
			description:
				'Custom CRM system with item tracking and state management. Built to handle the specific operational workflows of a networking business with complex pipeline logic.',
			tech: ['Angular', 'Firebase', 'Node.js'],
			highlights: [
				'Custom pipeline and state management',
				'Item tracking across operational workflows',
				'Role-based access and reporting'
			]
		},
		{
			name: 'Knox Precious Metals',
			client: 'Knox',
			description:
				'Digital platform for a precious metals business, combining e-commerce principles with financial-product-level credibility and trust requirements.',
			tech: ['Custom Platform', 'Firebase', 'Payment Integration'],
			highlights: [
				'High-trust financial product environment',
				'Secure transaction handling',
				'Investment-grade UI/UX design'
			]
		},
		{
			name: 'Discovery Leadership Summit',
			client: 'Discovery',
			description:
				'Digital experience for Discovery\'s Leadership Summit — one of South Africa\'s premier corporate events. Event management and digital presence for a major brand.',
			tech: ['Web Development', 'Event Platform'],
			highlights: [
				'Major corporate brand delivery',
				'Event-driven digital experience',
				'Large-scale audience engagement'
			]
		}
	],

	capabilities: [
		{
			label: 'Build',
			icon: '⚡',
			description: 'Custom software, websites, apps, and platforms built to solve real business problems.',
			items: [
				'Website Design & Development',
				'Custom Application Development',
				'E-commerce & Shopify',
				'WordPress Development',
				'Mobile & Cross-platform Apps'
			]
		},
		{
			label: 'Grow',
			icon: '📈',
			description: 'Marketing systems and growth engines that drive qualified leads and revenue.',
			items: [
				'SEO & GEO (AI Search)',
				'Google Ads & Paid Media',
				'Email Automation',
				'WhatsApp Automation',
				'Explainer Videos'
			]
		},
		{
			label: 'Automate',
			icon: '⚙️',
			description: 'Systems integration and AI-powered workflows that reduce admin and unlock capability.',
			items: [
				'Systems & Integrations',
				'AI Development & Chatbots',
				'CRM & Sales Systems',
				'Workflow Orchestration',
				'Data Processing Pipelines'
			]
		},
		{
			label: 'Specialise',
			icon: '🎯',
			description: 'Niche technical products and consulting for unique business challenges.',
			items: [
				'3D Vehicle Configurators',
				'Digital Consulting',
				'App Finishing & Rescue',
				'Data to API',
				'Product Strategy'
			]
		}
	],

	clients: [
		{ name: 'Toyota', industry: 'Automotive', description: '6+ year configurator partnership' },
		{ name: 'Discovery', industry: 'Financial Services', description: 'Leadership Summit digital experience' },
		{ name: 'Front Runner', industry: 'Automotive Accessories', description: '3D product configurator' },
		{ name: 'Cell C', industry: 'Telecommunications' },
		{ name: 'DStv', industry: 'Media & Entertainment', description: 'Email marketing campaigns' },
		{ name: 'MiWay', industry: 'Insurance' },
		{ name: 'Mahindra', industry: 'Automotive' },
		{ name: 'ParkUpp', industry: 'PropTech', description: 'Monthly parking platform' },
		{ name: 'American Chamber of Commerce', industry: 'Institutional', description: 'Long-term web partnership' },
		{ name: 'TTTFP / European Union', industry: 'International / NGO', description: 'Website management' },
		{ name: 'Finova', industry: 'Finance & Investment' },
		{ name: 'Times of Eswatini', industry: 'Media / Publishing' },
		{ name: 'DIY Hardware', industry: 'Retail / E-commerce', description: 'Complete e-commerce store' },
		{ name: 'Tjhoko Paint', industry: 'Retail', description: 'Online store' },
		{ name: 'Waz Furniture', industry: 'Furniture / E-commerce' },
		{ name: 'MySky Networks', industry: 'Networking / CRM', description: 'Custom CRM system' }
	],

	coverLetter: `Dear Hiring Team,

I have spent most of my career building technology with one core purpose in mind: helping people become more productive, more empowered, and more capable through better systems.

My relationship with programming started early. My dad introduced me to an old HP-85, gave me a few books, and that was enough to set me off on a path I have followed ever since. From the beginning, I was drawn not only to programming itself, but to the idea that software could remove friction, unlock capability, and help people do more than they could do before.

Early in my career, I worked at a publishing company where we were reaching very large audiences and processing hundreds of thousands of emails per month across substantial databases. That environment taught me a great deal about digital reach, scale, systems, and the mechanics of communicating with large numbers of people through technology.

At the age of 23, I started my own business. At the time, I believed I would remain an entrepreneur for the rest of my life. The reason I chose that path was not because I wanted to move away from technology at scale, but because I wanted to apply what I had learned in a more personal and meaningful way. I wanted to work closely with clients, build genuine relationships, and help smaller businesses grow in ways that felt direct, practical, and empowering.

For the past 13 years, that is what I have done. I have built and led work across websites, custom software, e-commerce, automation, marketing systems, integrations, AI-assisted workflows, and more specialised digital tools. Throughout that time, the constant thread has been the same: I have always been most motivated by technology that makes people and businesses more effective.

What has changed recently is the scale and direction of AI.

For the first time in my career, I am seriously considering returning to a larger organisation. The reason is not that I have lost my entrepreneurial drive. It is that I increasingly believe the greatest impact I can have now lies within the ecosystem of companies that are shaping the future of AI at global scale.

I have spent much of my career looking for ways to improve productivity through software. More recently, that has evolved into asking what happens when AI becomes the interface layer through which people interact with systems, platforms, and workflows. The pattern I keep seeing is that many of the ideas smaller builders might pursue independently are likely to converge around a handful of major AI leaders with the reach, infrastructure, research depth, and platform power to shape how these capabilities are deployed across the world.

That shift has changed my thinking. Rather than spending the next chapter of my career building around the edges of that transformation, I want to help drive it from within. I want to contribute where the reach is greatest, where the leverage is highest, and where the work has the potential to improve productivity for people and businesses at massive scale.

What I would bring is a combination of technical depth, entrepreneurial ownership, practical execution, and a strong instinct for turning technology into real-world usefulness. I know how to build. I know how to adapt. I know how to work close to customer needs. And I care deeply about ensuring that the systems we create are not only powerful, but genuinely helpful.

I am now looking for the opportunity to bring that experience into an environment where ambition, technical excellence, and global impact meet. I believe that is where I can contribute the most value in the years ahead.

Thank you for your time and consideration.

Sincerely,
Mark Grenville`,

	whyAI: [
		'For the first time in my career, I am seriously considering returning to a larger organisation — not because I have lost my entrepreneurial drive, but because I believe the greatest impact I can have now lies within companies shaping the future of AI at global scale.',
		'I have spent much of my career looking for ways to improve productivity through software. More recently, that has evolved into asking what happens when AI becomes the interface layer through which people interact with systems, platforms, and workflows.',
		'The pattern I keep seeing is that many of the ideas smaller builders might pursue independently are likely to converge around a handful of major AI leaders with the reach, infrastructure, and platform power to shape how these capabilities are deployed across the world.',
		'Rather than spending the next chapter of my career building around the edges of that transformation, I want to help drive it from within — where the reach is greatest, where the leverage is highest, and where the work has the potential to improve productivity at massive scale.'
	]
};
