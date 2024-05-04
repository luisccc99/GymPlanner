import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import { Button, Checkbox, IconButton, Text, TextInput } from "react-native-paper";
import { Exercise } from "../../..";


export const emptyExercise: Exercise = {
    commonName: '',
    instructions: [{
        sets: null,
        reps: null,
        toFailure: false
    }]
};

export const ExerciseForm = (props: { nameSuffix?: string, handleRemove: () => void }) => {
    const { control } = useFormContext();
    const nameSuffix = props.nameSuffix || '';
    const instructionsSuffix = `${nameSuffix}instructions`;
    const { fields, append, remove } = useFieldArray({
        control,
        rules: { minLength: 1 },
        name: instructionsSuffix
    });

    return (
        <>

            <Controller
                control={control}
                name={`${nameSuffix}commonName`}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        mode='outlined'
                        label='Exercise'
                        value={value}
                        onChangeText={onChange}
                    />
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
        </>
    );
}


const ExerciseInstruction = (props: { nameSuffix?: string, onRemove: () => void }) => {
    const nameSuffix = props.nameSuffix || '';
    const { control } = useFormContext()
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
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        mode='outlined'
                        label='Sets'
                        style={{ width: 'auto' }}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={`${nameSuffix}reps`}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        style={{ marginLeft: 5, width: 'auto' }}
                        mode='outlined'
                        label='Reps'
                        disabled={toFailureSelected}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={`${nameSuffix}toFailure`}
                render={({ field: { value, onChange } }) => (
                    <Checkbox.Item
                        label='to failure'
                        status={value ? 'checked' : 'unchecked'}
                        onPress={() => onChange(!value)}
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
