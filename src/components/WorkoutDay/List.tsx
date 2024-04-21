import { Button, Card, Checkbox, IconButton, List, Text } from "react-native-paper"
import { useAppTheme } from "../../../theme";
import { View } from "react-native";
import { Exercise, Instruction } from "../../..";


const WorkoutDayList = (props: { exercises: Exercise[] }) => {
    return (
        <View>
            <List.Section>
                {props.exercises.map((exercise, idx) => (
                    <WorkoutDayListItem key={idx} exercise={exercise} idx={idx} />
                ))}
            </List.Section>
        </View>
    )
}

const WorkoutDayListItem = (props: { exercise: Exercise, idx: number }) => {
    const { idx, exercise } = props;
    const theme = useAppTheme();
    return (
        <List.Item
            style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
                marginTop: 10
            }}
            right={() => (
                <IconButton
                    size={32}
                    icon='check'
                    iconColor={theme.colors.onSurface}
                    rippleColor={theme.colors.primary}
                    mode='outlined'
                    onPress={() => console.log(idx, exercise.commonName)}
                />
            )}
            titleStyle={{
                fontWeight: 'bold',
                color: theme.colors.onBackground
            }}
            title={exercise.commonName}
            description={formatInstructions(exercise.instructions)}
        />
    )
}

const formatInstructions = (instructions: Instruction[]) => {
    let description = ''
    for (let i = 0; i < instructions.length; i++) {
        let prefix = getPrefix(i, instructions.length);
        description += `${prefix}${formatSetsAndDescription(instructions[i])}`
    }
    return description;
}

const formatSetsAndDescription = (instruction: Instruction) => {
    const { sets, reps, toFailure } = instruction;
    const setWord = sets > 1 ? 'sets' : 'set'
    if (toFailure) {
        return `${sets} ${setWord} to failure`
    }

    return `${sets} ${setWord} of ${reps} reps`
}

const getPrefix = (curr: number, total: number) => {
    const hasMoreThanOneItem = curr > 0;
    const isLast = curr === total - 1

    if (!hasMoreThanOneItem) {
        return ''
    }

    return isLast ? ', and ' : ', '
}

export default WorkoutDayList;