import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites(){
      AsyncStorage.getItem('favorites').then(response => {
        if (response){
          const favoritedTeachers = JSON.parse(response);
          const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
            return teacher.id
          })


          setFavorites(favoritedTeachersId)
        }
      })
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFilterSubmit(){
      loadFavorites()
         //listando itens com os filtros
      const response = await api.get('classes', {
        params: {
        subject,
        week_day,
        time
        }
    })

    setIsFiltersVisible(false) // apos o submit fecha os filtros
    setTeachers(response.data)
    }
    return(
        <View style={styles.container} >
            <PageHeader
             title="Proffys disponíveis"
              headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#fff" />
                </BorderlessButton>
                )}
            >

              { isFiltersVisible && (   
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}//pega o valor do input e passa para a variável subject
                        placeholder="Qual a matéria"
                        placeholderTextColor="#c1bccc"
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                      <TextInput
                        style={styles.input}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                        placeholder="Qual o dia"
                        placeholderTextColor="#c1bccc"
                     />

                        </View>
                        <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                      <TextInput
                        style={styles.input}
                        value={time}
                        onChangeText={text => setTime(text)}
                        placeholder="Qual horário"
                        placeholderTextColor="#c1bccc"
                     />

                        </View>
                    </View>
                    <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                        <Text style={styles.submitText}>Filtrar</Text>
                    </RectButton>
                </View>
              )}  
            </PageHeader>


            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>

               {teachers.map(
                   (teacher: Teacher) =>  
                   <TeacherItem
                     key={teacher.id}
                     teacher={teacher}
                     favorited={favorites.includes(teacher.id)}
                    />
                  )
                } 
             
                </ScrollView>
        </View>
    );
}
export default TeacherList;