import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { Appbar, PaperProvider, ProgressBar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements'
import { lightTheme, darkTheme, useAppTheme } from './theme';
import { useColorScheme } from 'react-native';
import WorkoutPlanForm, { DayName, DAY } from './src/screens/WorkoutPlan/NewWorkoutPlanScreen';
import { FormSummary } from './src/screens/WorkoutPlan/FormSummary';

const Stack = createNativeStackNavigator<RootStackParamList>();
export type RootStackParamList = {
  Home: undefined,
  WorkoutPlanForm: {
    day: DAY
  },
  FormSummary: undefined
}


export default function App(): React.JSX.Element {
  const isDarkTheme = useColorScheme() === 'dark';
  const paperTheme = useMemo(() => {
    return isDarkTheme ? darkTheme : lightTheme
  }, [isDarkTheme])

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            header: props => <CustomAppBar {...props} />,
            navigationBarColor: paperTheme.colors.background,
          }}
        >
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='WorkoutPlanForm'
            component={WorkoutPlanForm}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="FormSummary"
            component={FormSummary}
            options={{
              headerTitle: 'Summary'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const CustomAppBar = (props: NativeStackHeaderProps) => {
  const title = getHeaderTitle(props.options, props.route.name);
  return (
    <Appbar.Header mode='small'>
      <Appbar.Content title={title} />
    </Appbar.Header>)
}