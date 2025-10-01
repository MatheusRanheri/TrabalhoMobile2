import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Telas/Home';
import Cliente from './Telas/Cliente/index';
import Trabalhador from './Telas/Trabalhador/trabalhador';
import Login from './Telas/Login'
import Sucesso from './Telas/Sucesso';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Cliente' component={Cliente}/>
        <Stack.Screen name='Trabalhador' component={Trabalhador}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Sucesso' component={Sucesso}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

