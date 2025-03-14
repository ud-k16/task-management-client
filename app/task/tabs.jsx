import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TaskHome from "./home";
import AddTask from "./addTask";
import ModifyTask from "./modifyTask";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="TaskHome"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="TaskHome"
        component={TaskHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="Tasks" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="AddTask"
        component={AddTask}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="Tasks" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="ModifyTask"
        component={ModifyTask}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="Tasks" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
