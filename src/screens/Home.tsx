import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../../theme";


const HomeScreen = () => {
    const theme = useAppTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='headlineMedium'>Good afternoon, Luis!</Text>
            <Text variant='bodyLarge'>Today you have to do</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})


export default HomeScreen;