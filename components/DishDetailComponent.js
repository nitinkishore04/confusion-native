import React, { Component} from 'react'
import { View, Text, FlatList, ScrollView, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import { postFavorite, postComment } from '../redux/ActionCreators'


const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});
function RenderDish(props) {
    const dish = props.dish;
    
    if (dish != null) {
        return(
            <Card featuredTitle = {dish.name} image = {{ uri: baseUrl + dish.image }}>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        raised
                        reverse
                        style={{flex: 1, flexDirection: 'column', marginLeft: 30}}
                        name = { props.favorite ? 'heart' : 'heart-o'}
                        type = 'font-awesome'
                        color = '#f50'
                        onPress = { () => props.favorite ? console.log(' Already Favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        style={{flex: 1, flexDirection: 'column'}}
                        name = { 'pencil' }
                        type = 'font-awesome'
                        color = '#512DA8'
                        onPress = { () => props.showModal() }
                    />
                </View>
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
                <View style={{justifyContent: 'flex-start'}}>
                    <Rating
                    style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}
                        imageSize = {15}
                        readonly = {true}
                        ratingCount = {5}
                        startingValue = {parseInt(item.rating)}
                    />
                </View>
                <Text style={{fontSize: 12}}>{'--'+ item.author+ ',' +item.date}</Text>
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

let id =100;

class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state={
            show: false,
            author: '',
            comment: '',
            rating: 0
        }
    }

    showModal(){
        this.setState({ show: !this.state.show})
        console.log(this.state.show);
        
    }
    submitComment(dishId){
        console.log(JSON.stringify(this.state))
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.setState({ 
            show: false,
            author: '',
            comment: '',
            rating: 0
        })
    }

    markFavorites(dishId){
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: "Dish Detail"
    };


    render(){
        const dishId = this.props.navigation.getParam('dishId', '');        
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorites(dishId)}
                    showModal={() => this.showModal()}
                    />
                <RenderComment comment={this.props.comments.comments.filter(comment => comment.dishId === dishId)}/>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.show}
                    onDismiss={() => this.toogleModal()}
                    onRequestClose={() => this.toogleModal()}
                >
                    <View style={{justifyContent: 'center'}}>
                        <Rating
                            showRating
                            readonly={false}
                            startingValue={this.state.rating}
                            imageSize={30}
                            style={{paddingVertical: 10, marginBottom: 30}}
                            onFinishRating={(value) => this.setState({rating: value})}
                        />
                    </View>
                    <View>
                        <View style={styles.modal}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        type='font-awesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                                placeholder="Author"
                                style={{paddingBottom: 10}}
                                onChangeText={(name) => this.setState({author: name})}
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name='comment-o'
                                        type='font-awesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                                placeholder="Comment"
                                style={{paddingBottom: 10}}
                                onChangeText={(comment) => this.setState({comment: comment})}
                            />
                        </View>
                        <View style={{margin: 15}}>
                            <View style={{paddingBottom: 20}}>
                                <Button
                                    onPress = {() => {this.submitComment(dishId)}}
                                    color="#512DA8"
                                    title="Submit"
                                    style={{margin: 10}}
                                />
                            </View>
                            <Button
                                onPress = {() => {this.showModal()}}
                                color="grey"
                                title="Close"
                            />
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    formRow: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      margin: 20,
    },
    formLabel: {
      fontSize: 18,
      flex: 2,
    },
    formItem: {
      flex: 1,
    },
    modal: {
      justifyContent: "center",
      margin: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      backgroundColor: "#512DA8",
      textAlign: "center",
      color: "white",
      marginBottom: 20,
    },
    modalText: {
      fontSize: 18,
      margin: 10,
    },
  });


export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
