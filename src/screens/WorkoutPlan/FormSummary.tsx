import { ScrollView, View } from "react-native";
import { useWorkoutPlan } from "../../components/WorkoutPlan/store"
import { Button, Text } from "react-native-paper";
import { useAppTheme } from "../../../theme";
import { dayNames } from "./NewWorkoutPlanScreen";
import { formatInstructions } from "../../components/WorkoutDay/List";


export const FormSummary = () => {
    const { days, name } = useWorkoutPlan();
    const theme = useAppTheme();
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <ScrollView>
                {
                    days.map(workoutday => {
                        return (
                            <View key={workoutday.dayIdx} style={{ margin: 10 }}>
                                <Text variant='titleLarge'>{dayNames[workoutday.dayIdx]}</Text>
                                <View>
                                    {workoutday.isRestDay
                                        ? (
                                            <Text>Rest day 😊</Text>
                                        )
                                        : workoutday.exercises.map((exercise, idx) => (
                                            <View key={idx} style={{ marginBottom: 10 }}>
                                                <Text variant="bodyLarge">{exercise.commonName}</Text>
                                                <Text style={{ marginLeft: 10 }}>{formatInstructions(exercise.instructions)}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <Button
                mode='contained'
                textColor={theme.colors.onPrimary}
                style={{ margin: 'auto' }}
                onPress={() => console.log('creating workout')}>Create workout</Button>
        </View >
    )
}