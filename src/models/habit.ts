export interface Habit {
    name: string,
    frequency: "daily" | "weekly" | "n-per-week",
    frequencyPerWeek: null | number,
    startDate: string,
    endDate: null | string
}

// in-memory habits for testing purpose
export let habits: Habit[] = [
    {
        name: "testHabit",
        frequency: "daily",
        startDate: Date.now().toLocaleString(),
        endDate: null,
        frequencyPerWeek: null
    }
]