# Interfaces & Models

All types are defined in `src/lib/types/cv.ts`.

## Core Data Model

### CVData

The root interface consumed by all view modes and API routes.

```typescript
interface CVData {
  personal: PersonalInfo;
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  projects: Project[];
  capabilities: Capability[];
  clients: Client[];
  coverLetter: string;
  whyAI: string[];
}
```

### PersonalInfo

```typescript
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  tagline: string;
  summary: string;
  profileImage: string;
}
```

### ExperienceEntry

```typescript
interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}
```

### SkillCategory

```typescript
interface SkillCategory {
  category: string;
  items: string[];
}
```

### Project

```typescript
interface Project {
  name: string;
  client?: string;
  description: string;
  tech: string[];
  highlights: string[];
}
```

### Capability

```typescript
interface Capability {
  label: string;
  icon: string;
  description: string;
  items: string[];
}
```

### Client

```typescript
interface Client {
  name: string;
  industry: string;
  description?: string;
}
```

## View Mode Types

```typescript
type ViewMode = 'gui' | 'cli' | 'swagger' | 'json' | 'yaml' | 'document';

interface ViewModeOption {
  id: ViewMode;
  label: string;
  icon: string;
  description: string;
}
```

## API Routes

All routes return JSON and consume `CVData` from `src/lib/data/cv.ts`.

| Route | Response Type | Description |
|-------|-------------|-------------|
| `GET /api/cv` | `CVData` | Full CV object |
| `GET /api/cv/personal` | `PersonalInfo` | Name, title, contact |
| `GET /api/cv/experience` | `ExperienceEntry[]` | Work history |
| `GET /api/cv/skills` | `SkillCategory[]` | Technical skills |
| `GET /api/cv/projects` | `Project[]` | Portfolio projects |
| `GET /api/cv/clients` | `Client[]` | Client list |
| `GET /api/cv/cover-letter` | `{ coverLetter: string }` | Cover letter text |
