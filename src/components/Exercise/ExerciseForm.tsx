import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import { Button, Checkbox, IconButton, Surface, Text, TextInput } from "react-native-paper";
import { Exercise } from "../../..";
import { useAppTheme } from "../../../theme";


export const emptyExercise: Exercise = {
    commonName: '',
    instructions: [{
        sets: 0,
        reps: 0,
        toFailure: false
    }]
};

export const ExerciseForm = (props: { nameSuffix?: string, handleRemove: () => void }) => {
    const theme = useAppTheme()
    const { control, getFieldState } = useFormContext();
    const nameSuffix = props.nameSuffix || '';
    const instructionsSuffix = `${nameSuffix}instructions`;
    const { fields, append, remove } = useFieldArray({
        control,
        rules: { minLength: 1 },
        name: instructionsSuffix
    });
    const state = getFieldState(`${nameSuffix}instructions`)
    return (
        <View>
            <Controller
                control={control}
                name={`${nameSuffix}commonName`}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label='Exercise'
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={!!error}
                        />
                        <Text
                            variant='bodySmall'
                            style={{ color: theme.colors.error }}
                        >{error?.message}</Text>
                    </>
                )}
            />

            <Text
                variant='bodyLarge'
                style={{
                    marginTop: 10,
                }}>
                Workout instructions
            </Text>
            {
                fields.map((field, idx) => (
                    <ExerciseInstruction
                        key={field.id}
                        nameSuffix={`${instructionsSuffix}.${idx}.`}
                        onRemove={() => remove(idx)}
                    />
                ))
            }
            {
                state?.error && (
                    <Surface
                        mode="flat"
                        style={{
                            backgroundColor: theme.colors.errorContainer,
                            padding: 10,
                            borderRadius: 5
                        }}>
                        {
                            Array.isArray(state.error) ? (
                                <Text>There are more errors</Text>
                            ) : (
                                <Text style={{ color: theme.colors.onErrorContainer }}>
                                    {state.error.message}
                                </Text>

                            )
                        }

                    </Surface>
                )
            }

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <Button
                    style={{
                        width: 150,
                        alignSelf: 'stretch',
                    }}
                    onPress={() => append({ sets: "", reps: "", toFailure: false })}
                    mode='text'
                >
                    Add instruction
                </Button>
                <Button
                    style={{ marginRight: 'auto', }}
                    onPress={props.handleRemove}
                >
                    Remove exercise
                </Button>
            </View>
        </View>
    );
}


const ExerciseInstruction = (props: { nameSuffix?: string, onRemove: () => void }) => {
    const nameSuffix = props.nameSuffix || '';
    const { control, setValue } = useFormContext()
    const toFailureSelected = useWatch({ name: `${nameSuffix}toFailure`, control, defaultValue: false })
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
        }}>
            <Controller
                control={control}
                name={`${nameSuffix}sets`}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label='Sets*'
                            style={{ width: 70 }}
                            keyboardType="numeric"
                            value={value === 0 ? '' : value.toString()}
                            onChangeText={onChange}
                            error={!!error}
                            onBlur={onBlur}
                        />
                    </>
                )}
            />
            <Controller
                control={control}
                name={`${nameSuffix}reps`}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={{ marginLeft: 5, width: 70 }}
                            mode='outlined'
                            label='Reps'
                            disabled={toFailureSelected}
                            keyboardType="numeric"
                            value={value === 0 ? '' : value.toString()}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={!!error}
                        />
                    </>
                )}
            />
            <Controller
                control={control}
                name={`${nameSuffix}toFailure`}
                render={({ field: { value, onChange } }) => (
                    <Checkbox.Item
                        label='to failure'
                        status={value ? 'checked' : 'unchecked'}
                        onPress={() => {
                            const newValue = !value;
                            if (newValue) {
                                setValue(`${nameSuffix}reps`, 0)
                            }
                            onChange(newValue)
                        }}
                    />
                )}
            />
            <IconButton
                mode='contained-tonal'
                icon='minus'
                onPress={props.onRemove}
            />
        </View>
    )
}
