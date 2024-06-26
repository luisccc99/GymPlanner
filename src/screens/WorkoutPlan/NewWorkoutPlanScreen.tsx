import { ScrollView, View } from "react-native"
import { Button, Checkbox, IconButton, ProgressBar, Surface, Text } from "react-native-paper"
import { useAppTheme } from "../../../theme"
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { emptyExercise, ExerciseForm } from "../../components/Exercise/ExerciseForm";
import { useWorkoutPlan } from "../../components/WorkoutPlan/store";
import { Exercise, WorkoutDay } from "../../..";
import { yupResolver } from "@hookform/resolvers/yup";
import { workoutDaySchema } from "../../components/Exercise/ExerciseSchema";

export enum DAY {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6
}
export const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type DayName = typeof dayNames[number];

type WorkoutPlanFormProps = NativeStackScreenProps<RootStackParamList, 'WorkoutPlanForm'>

const WorkoutPlanForm = (props: WorkoutPlanFormProps) => {
    const theme = useAppTheme();
    const dayIdx = props.route.params.day;
    const dayName = dayNames[dayIdx]
    const { days, reset, saveWorkoutDay } = useWorkoutPlan();

    const methods = useForm<WorkoutDay>({
        defaultValues: {
            dayIdx,
            exercises: [],
            isRestDay: false
        },
        resolver: yupResolver(workoutDaySchema),
        mode: 'onBlur',
    });

    const handleSaveWorkoutDay = () => {
        saveWorkoutDay(methods.getValues())
    }

    const handlePrev = useCallback(() => {
        handleSaveWorkoutDay();

        props.navigation.replace('WorkoutPlanForm', { day: dayIdx - 1 });
    }, [dayIdx])

    const handleNext = useCallback(async () => {
        const res = await methods.trigger()
        if (!res) {
            return
        }
        handleSaveWorkoutDay()
        if (dayIdx === dayNames.length - 1) {
            props.navigation.push('FormSummary')
            return;
        }
        props.navigation.replace('WorkoutPlanForm', { day: dayIdx + 1 })
    }, [dayIdx]);

    const handleClose = useCallback(() => {
        reset()
        props.navigation.pop()
    }, []);

    useEffect(() => {
        const workoutDay = days[dayIdx];
        if (!workoutDay) return;
        methods.reset(workoutDay)
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <FormProvider {...methods}>
                <ScreenHeader
                    onClose={handleClose}
                    dayName={dayName}
                    handlePrev={handlePrev}
                    progress={(dayIdx + 1) / dayNames.length}
                />
                <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
                    {
                        (
                            methods.formState.errors.exercises?.type === 'min' ||
                            methods.formState.errors.exercises?.root?.type === 'min'
                        ) && (
                            <Surface
                                mode="flat"
                                style={{
                                    backgroundColor: theme.colors.errorContainer,
                                    padding: 10,
                                    borderRadius: 5
                                }}>
                                <Text style={{ color: theme.colors.onErrorContainer }}>
                                    {
                                        methods.formState.errors.exercises?.message ||
                                        methods.formState.errors.exercises?.root?.message
                                    }
                                </Text>
                            </Surface>
                        )
                    }
                    <RestDayCheck />
                    <WorkoutDayForm />
                </ScrollView>
                <ScreenBottom
                    handleNext={handleNext}
                />
            </FormProvider>
        </SafeAreaView >
    )
}

const RestDayCheck = () => {
    const { control } = useFormContext();
    const exercises = useWatch({ name: 'exercises', defaultValue: [], control })
    return (
        <Controller
            name='isRestDay'
            control={control}
            render={({ field: { value, onChange } }) => (
                <Checkbox.Item
                    disabled={exercises.length > 0}
                    label='This is a rest day'
                    status={value ? 'checked' : 'unchecked'}
                    onPress={_ => onChange(!value)} />
            )}
        />
    )
}

const WorkoutDayForm = () => {
    const theme = useAppTheme();
    const { control, getFieldState } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: 'exercises'
    });
    
    const isRestDay = useWatch({ name: 'isRestDay', control })

    const removeExercise = useCallback((idx: number) => {
        remove(idx)
    }, [])

    return (
        <>
            {fields.map((field, idx) => (
                <Surface
                    key={field.id}
                    elevation={4}
                    mode='flat'
                    style={{
                        backgroundColor: theme.colors.surfaceContainer,
                        padding: 10,
                        marginBottom: 10
                    }}
                >
                    <ExerciseForm
                        nameSuffix={`exercises.${idx}.`}
                        handleRemove={() => removeExercise(idx)}

                    />
                </Surface>
            ))}
            <Button
                icon='plus'
                style={{ marginBottom: 30 }}
                disabled={isRestDay}
                onPress={() => append(emptyExercise)}
            >Add exercise</Button>
        </>
    )

}

const ScreenHeader = (props: { onClose: () => void, dayName: DayName, handlePrev: () => void, progress: number }) => {
    const theme = useAppTheme();

    return (
        <View style={{ paddingBottom: 10 }}>
            <View
                style={{
                    backgroundColor: theme.colors.surface,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <IconButton
                    style={{ opacity: props.dayName === 'Monday' ? 0 : 1 }}
                    disabled={props.dayName === 'Monday'}
                    icon='arrow-left'
                    onPress={props.handlePrev}
                />
                <Text variant='titleLarge' style={{ textAlign: 'center', color: theme.colors.onBackground }}>
                    {props.dayName}
                </Text>
                <IconButton
                    icon='close'
                    onPress={props.onClose}
                />
            </View>
            <ProgressBar progress={props.progress} />
        </View>
    )
}

const ScreenBottom = (props: { handleNext: () => void }) => {
    const theme = useAppTheme();

    return (
        <Button
            mode='contained-tonal'
            onPress={props.handleNext}
            textColor={theme.colors.onPrimaryContainer}
            buttonColor={theme.colors.primaryContainer}
            style={{
                margin: 15,
            }}
        >
            Next
        </Button>
    )
}

export default WorkoutPlanForm;