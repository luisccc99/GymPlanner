import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import HomeScreen from './src/screens/Home';
import { Appbar, PaperProvider } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements'
import { lightTheme, darkTheme, useAppTheme } from './theme';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
export type RootStackParamList = {
  Home: undefined
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
            header: props => <CustomAppBar {...props} />
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
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