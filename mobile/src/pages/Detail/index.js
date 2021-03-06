import React from 'react';
import {Feather} from '@expo/vector-icons'
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import logoImg from '../../assets/logo.png'
import {useNavigation,useRoute} from '@react-navigation/native/'
import styles from './style';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, mensagem teste para envio de email do caso ${incident.title}"`;


    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha Atropelada',
            recipients: ['raphael@gmail.com'],
            body: message,
            
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty, {marginTop:0}}>ONG de {incident.city}/{incident.uf}:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style:'currency',
                        currency:'BRL'}).format(incident.value)}
                    </Text> 
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View  style={styles.actions}>
                    <TouchableOpacity onPress={sendWhatsApp} style={styles.action}> 
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendMail} style={styles.action}> 
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}