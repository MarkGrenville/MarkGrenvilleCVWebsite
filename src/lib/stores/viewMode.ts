import { writable } from 'svelte/store';
import type { ViewMode } from '$lib/types/cv';

export const viewMode = writable<ViewMode>('gui');
export const sidebarOpen = writable(false);
