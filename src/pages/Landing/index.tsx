import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';
import styles from './styles';



import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {
    const navigation = useNavigation(); //navegação entre telas

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
           const { total } = response.data

           setTotalConnections(total)
        })
    }, [])

    function handleNavigateToClassesPage(){
        navigation.navigate('GiveClasses'); //Buscar a rota giveClasses de AppStack
    }
    function handleNavigateToStudy(){
        navigation.navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

           <View style={styles.buttonsContainer}>
               <TouchableOpacity onPress={handleNavigateToStudy} style={[styles.button, styles.buttonPrimary]}>
                   <Image source={studyIcon} />
                 <Text style={styles.buttonText}>Estudar</Text>  
               </TouchableOpacity>

               <RectButton
                onPress={handleNavigateToClassesPage}
                 style={[styles.button, styles.buttonSecondary]}
                >
                   <Image source={giveClassesIcon} />
                 <Text style={styles.buttonText}>Dar aulas</Text>  
               </RectButton>
               
           </View>

           <Text style={styles.totalConnections}>
               Total de {totalConnections} conexões já realizadas {' '}
               <Image source={heartIcon} />
           </Text>
        </View>
    );
}

export default Landing;