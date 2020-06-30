import React, { Component} from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card featuredTitle = {dish.name} image = {require('./images/buffet.png')}>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <Icon
                    raised
                    reverse
                    name = { props.favorite ? 'heart' : 'heart-o'}
                    type = 'font-awesome'
                    color = '#f50'
                    onPress = { () => props.favorite ? console.log('Already Favorite') : props.onPress()}
                />
                {/* <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    /> */}
            </Card>
        );
    }
    else{
        return(
            <View/>
        );
    }

}

function RenderComment(props){
    const comment = props.comment
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.comment+ ','+item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList
            data = {comment}
            renderItem = {renderCommentItem}
            keyExtractor = {item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state={
            dishes: DISHES,
            comment: COMMENTS,
            favorites: []
        };
    }

    markFavorites(dishId){
        this.setState({ favorites: this.state.favorites.concat(dishId)});
    }
    // markFavorite(dishId) {
    //     this.setState({favorites: this.state.favorites.concat(dishId)});
    // }
    
    static navigationOptions = {
        title: "Dish Detail"
    };


    render(){
        const dishId = this.props.navigation.getParam('dishId', '');        
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} 
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorites(dishId)}
                    />
                <RenderComment comment={this.state.comment.filter(comment => comment.dishId === dishId)}/>
            </ScrollView>
        );
    }
}


export default DishDetail;
