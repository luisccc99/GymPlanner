import { ScrollView, StatusBar, useColorScheme, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAppTheme } from "../../theme";
import WorkoutDayList from "../components/WorkoutDay/List";
import { Exercise } from "../..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { DAY } from "./WorkoutPlan/NewWorkoutPlanScreen";

const workoutForToday: Exercise[] = [
    {
        commonName: 'Squats',
        instructions: [
            {
                sets: 4,
                reps: 8,
                toFailure: false,
            },
        ]
    }, {
        commonName: 'Hack smith squat',
        instructions: [
            {
                sets: 3,
                reps: 12,
                toFailure: false,
            }, {
                sets: 1,
                reps: null,
                toFailure: true,
            }
        ]
    }, {
        commonName: 'Leg extension',
        instructions: [
            {
                sets: 3,
                reps: 8,
                toFailure: false,
            }, {
                sets: 1,
                reps: 16,
                toFailure: false,
            }
        ]
    }, {
        commonName: 'Bulgarian split squat',
        instructions: [
            {
                sets: 4,
                reps: 8,
                toFailure: false,
            }
        ]
    }, {
        commonName: 'Leg curl',
        instructions: [
            {
                sets: 4,
                reps: 12,
                toFailure: false,
            }
        ]
    },
    {
        commonName: 'Standing calf raises',
        instructions: [
            {
                sets: 4,
                reps: 15,
                toFailure: false,
            }
        ]
    }, {
        commonName: 'Seated calf raises',
        instructions: [
            {
                sets: 4,
                reps: 15,
                toFailure: false,
            }
        ]
    }
]

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
const HomeScreen = (props: HomeScreenProps) => {
    const theme = useAppTheme();
    const isDark = useColorScheme() === 'dark';

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar
                backgroundColor={theme.colors.surface}
                barStyle={isDark ? 'light-content' : 'dark-content'}
            />
            <View style={{ padding: 15 }}>
                <Text variant='headlineMedium'>Good afternoon, Luis!</Text>
                <Text variant='bodyLarge'>Today's workout plan is</Text>
                <Button
                    icon='plus'
                    onPress={() => props.navigation.navigate('WorkoutPlanForm', { day: DAY.MONDAY })}
                >
                    Create Workout Plan
                </Button>
            </View>
            <ScrollView>
                <WorkoutDayList exercises={workoutForToday} />
            </ScrollView>
        </View>
    )
}

export default HomeScreen;