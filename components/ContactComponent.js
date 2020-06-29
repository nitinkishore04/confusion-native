import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

function ContactDetail() {
    return(
        <Card title = "Contact Information">
            <Text>121, Clear Water Bay Road</Text>
            <Text>Clear Water Bay, Kowloon</Text>
            <Text>HONG KONG</Text>
            <Text>Tel: +852 1234 5678</Text>
            <Text>Fax: +852 8765 4321</Text>
            <Text>Email:confusion@food.net</Text>
        </Card>
    );
}

class Contact extends Component{

    static navigationOptions = {
        title: "Contact Us"
    };

    render(){
        
        return(
           <ContactDetail/>
        );
    }
}

export default Contact;