export interface PersonalInfo {
	name: string;
	title: string;
	location: string;
	email: string;
	tagline: string;
	summary: string;
	profileImage: string;
}

export interface ExperienceEntry {
	company: string;
	role: string;
	period: string;
	description: string;
	highlights: string[];
}

export interface SkillCategory {
	category: string;
	items: string[];
}

export interface Project {
	name: string;
	client?: string;
	description: string;
	tech: string[];
	highlights: string[];
}

export interface Capability {
	label: string;
	icon: string;
	description: string;
	items: string[];
}

export interface Client {
	name: string;
	industry: string;
	description?: string;
}

export interface CVData {
	personal: PersonalInfo;
	experience: ExperienceEntry[];
	skills: SkillCategory[];
	projects: Project[];
	capabilities: Capability[];
	clients: Client[];
	coverLetter: string;
	whyAI: string[];
}

export type ViewMode = 'gui' | 'cli' | 'swagger' | 'json' | 'document' | 'card' | 'game';

export interface ViewModeOption {
	id: ViewMode;
	label: string;
	icon: string;
	description: string;
}
