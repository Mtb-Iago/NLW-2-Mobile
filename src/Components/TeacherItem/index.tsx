import React, { useState } from 'react';
import { View,Text, Image, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher{
    avatar: string
    bio: string
    cost: number
    id: number
    name: string
    subject: string
        
    whatsapp: string
    
}

interface TeacherItemProps{
    teacher?: Teacher
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited)
    
    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites')
            
        let favoritesArray = [];
        if (favorites){
            favoritesArray = JSON.parse(favorites)
        } 
        
        if (isFavorited){
            //remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((TeacherItemFavorites: Teacher) => {
                return TeacherItemFavorites.id === teacher?.id;
            })
            setIsFavorited(false)
            favoritesArray.splice(favoritesArray, 1);
        } else {
            //add aos favoritos          
            favoritesArray.push(teacher);

            setIsFavorited(true)
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
        
    }
    
    function handleLinkToWhatsapp(){

            api.post('connections', {
                user_id: teacher?.id,
            })
            Linking.openURL(`whatsapp://send?phone=55${teacher?.whatsapp}`)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: teacher?.avatar}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher?.name}</Text>
                    <Text style={styles.subject}>{teacher?.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                    {teacher?.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora  {'   '}
                    <Text style={styles.priceValue}>R$ {teacher?.cost}</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                           isFavorited ? styles.favorited : {}
                        ]}>

                       { isFavorited ?
                          <Image source={unFavoriteIcon} />
                        : <Image source={heartOutLineIcon}                        
                       />}
                        
                    </RectButton>

                    <RectButton
                     style={styles.contactButton}
                     onPress={handleLinkToWhatsapp}
                    >
                        <Image source={whatsAppIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
    
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;