import { create } from 'zustand';
import { WorkoutDay } from '../../..';


interface WorkoutPlanState {
    name: string;
    days: WorkoutDay[],
    saveWorkoutDay: (day: WorkoutDay) => void,
    reset: () => void
}

const initialState = {
    name: '',
    days: []
}

export const useWorkoutPlan = create<WorkoutPlanState>(set => ({
    name: '',
    days: [],
    saveWorkoutDay: (workoutPlan: WorkoutDay) => set(state => {
        let days: WorkoutDay[] = []
        const existing = state.days.findIndex(value => value.dayIdx === workoutPlan.dayIdx)
        if (existing < 0) {
            days = [...state.days, workoutPlan]
        } else {
            days = state.days.map(d => d.dayIdx === existing
                ? ({ ...d, isRestDay: workoutPlan.isRestDay, exercises: workoutPlan.exercises })
                : d)
        }

        return { days };
    }),
    reset: () => set(initialState)
}))

