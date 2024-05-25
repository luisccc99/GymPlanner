import { array, boolean, number, object, ObjectSchema, string } from "yup";
import { Exercise, Instruction, WorkoutDay } from "../../..";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

export const instructionSchema: ObjectSchema<Instruction> = object({
    sets: number().required('Enter number of sets').min(1),
    toFailure: boolean().required(),
    reps: number().when('toFailure', {
        is: false,
        then: schema => schema.required('Enter number of reps').min(1),
        otherwise: schema => schema.optional()
    })
})

export const exerciseSchema: ObjectSchema<Exercise> = object({
    commonName: string().required('Add a name to this exercise'),
    instructions: array().of(instructionSchema).required().min(1, 'You have to add instructions for this exercise'),
});

export const workoutDaySchema: ObjectSchema<WorkoutDay> = object({
  dayIdx: number().defined(),
  isRestDay: boolean().defined(),
  exercises: array().of(exerciseSchema).defined().when('isRestDay', {
    is: true,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.min(1, 'You have to add an exercise or select this day as a rest day').required()
  })
})

