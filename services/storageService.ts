const PROMPTS_STORAGE_KEY = 'gemini-image-editor-prompts';

export const getPrompts = (): string[] => {
    try {
        const storedPrompts = localStorage.getItem(PROMPTS_STORAGE_KEY);
        return storedPrompts ? JSON.parse(storedPrompts) : [];
    } catch (error) {
        console.error("Failed to parse prompts from localStorage", error);
        return [];
    }
};

export const savePrompts = (prompts: string[]): void => {
    try {
        localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(prompts));
    } catch (error) {
        console.error("Failed to save prompts to localStorage", error);
    }
};
