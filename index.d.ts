
export type WorkoutPlan = {
    plan: WorkoutDay[]
}

export type WorkoutDay = {
    day: number,
    exercises: Exercise[]
}

export type Exercise = {
    commonName: string;
    instructions: Instruction[]
}

export type Instruction = {
    sets: number;
    reps: number | null;
    toFailure: boolean;
}