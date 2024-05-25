
export type WorkoutPlan = {
    plan: WorkoutDay[]
}

export type WorkoutDay = {
    dayIdx: number;
    isRestDay: boolean;
    exercises: Exercise[];
}

export type Exercise = {
    commonName: string;
    instructions: Instruction[]
}

export type Instruction = {
    sets: number;
    toFailure: boolean;
    reps?: number;
}