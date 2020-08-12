import React from 'react';
import { View,Text, Image } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';


function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: 'https://github.com/mtb-iago.png'}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Iago Oliveira</Text>
                    <Text style={styles.subject}>Quimica</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                    uuahsuhasuhsauhsuhsauhsauhsuahsuhsauhsauhsauhsauhsahsa {'\n'}{'\n'}
                    uhasuhsauhsaushusahusahusahsauhsauhsa
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora  {'   '}
                    <Text style={styles.priceValue}>R$ 180,00</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                       {/* <Image source={heartOutLineIcon} />*/}
                        <Image source={unFavoriteIcon} />
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsAppIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;