import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';

import styles from './styles';

function Favorites() {
    const [favorites, setFavorites] = useState([])
    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
          if (response){
            const favoritedTeachers = JSON.parse(response);
           // const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
             // return teacher.id
           // }) 
  
            setFavorites(favoritedTeachers)
          }
        })
      }

      useFocusEffect(() => {
        loadFavorites()
      })
  
    return(
        <View style={styles.container} >
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={true}
                        />
                    )
                })}
                
                
                </ScrollView>
        </View>
    );
}
export default Favorites;