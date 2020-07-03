import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';



const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorite extends Component {

    static navigationOPtions = {
        title: "My Favorites"
    }

    render(){
        const { navigate } = this.props.navigation;


        const renderMenuItem = ({item, index}) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];

            return(
                <View style={{margin: 8}}>
                    <Swipeout right={rightButton} autoClose={true}>
                        <ListItem
                            key = {index}
                            title = {item.name}
                            onPress = {() => navigate('DishDetail', { dishId: item.id })}
                            subtitle = {item.description}
                            hideChevron = {true}
                            leftAvatar = {{ source: { uri: baseUrl + item.image  } }}
                        />
                    </Swipeout>
                </View>
            );
        }

        if (this.props.dishes.isLoading){
            return(
                <Loading/>
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList 
                data = {this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                renderItem = {renderMenuItem}
                keyExtractor = { item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);