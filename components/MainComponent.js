import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import { Icon } from 'react-native-elements';



const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu,
        navigationOptions: ({navigation}) =>({
            headerLeft: <Icon name="menu" size={24}
            color = "white"
            onPress = {() => navigation.toggleDrawer()}
            />
        }) 
    },
        DishDetail: { screen: DishDetail },
        },{
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
            },
        },
    },
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        },{
        navigationOptions: ({navigation}) =>({ 
            headerStyle: {
                backgroundColor: '#512DA8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
            },
            headerLeft: <Icon name="menu" size={24}
            color = "white"
            onPress = {() => navigation.toggleDrawer()}
            />
        }),
    },
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    },{
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: '#512DA8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
            },
            headerLeft: <Icon name="menu" size={24}
            color = "white"
            onPress = {() => navigation.toggleDrawer()}
            />
        }),
    },
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About},
    },{
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: '#512DA8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
            },
            headerLeft: <Icon name="menu" size={24}
            color = "white"
            onPress = {() => navigation.toggleDrawer()}
            />  
        }),
    }
)

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: "Home",
            drawLabel: "Home",
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name= 'home'
                    type= 'font-awesome'
                    size = {24}
                    color = { tintColor }
                    />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: "Menu",
            drawLabel: "Menu",
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name= 'list'
                    type= 'font-awesome'
                    size = {24}
                    color = { tintColor }
                    />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: "Contact",
            drawLabel: "Contact",
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name= 'address-card'
                    type= 'font-awesome'
                    size = {22}
                    color = { tintColor }
                    />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: "About Us",
            drawLabel: "About us",
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name= 'info-circle'
                    type= 'font-awesome'
                    size = {24}
                    color = { tintColor }
                    />
            )
        }
    }
}, {
    drawerBackgroundColor: "#D1C4E9"
});

class Main extends Component {
    render(){
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator/>
            </View>
        );
    }
}
export default Main;