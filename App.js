import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <ScrollView style={styles.questionBox}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <Image source={image} style={styles.image} />
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
        />
      </ScrollView>
  );
};


const App = () => {
  const questions = [
    {
      label: 'What animal is this?',
      image: require('./img/zebra.jpg'),
      options: ['Elephant', 'Tiger', 'Zebra'],
      correctAnswer: 'Zebra',
    },
    {
      label: 'What animal is this?',
      image: require('./img/giraffe.jpg'),
      options: ['Giraffe', 'Leopard', 'Deer'],
      correctAnswer: 'Giraffe',
    },
    {
      label: 'What bird is this?',
      image: require('./img/owl.jpg'),
      options: ['Hummingbird', 'Owl', 'Peacock'],
      correctAnswer: 'Owl',
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const AnswerUpdate = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const Submit = () => {
    const score = calculateScore();
    Alert.alert(`You have ${score} correct answers`);
  };

  return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.iconContainer}>
          <Icon name={"paw"} size={24} color={'#4A2511'} />
          <Text style={styles.titleText}>Charmaine's Quiz</Text>
        </View>
        {questions.map((question, index) => (
            <QuestionBox
                key={index}
                label={question.label}
                image={question.image}
                options={question.options}
                selectedValue={answers[index]}
                onValueChange={(value) => AnswerUpdate(value, index)}
            />
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Submit Answers" onPress={Submit} color="#4A2511" />
        </View>
        <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
          <Text style={styles.touchableText}>Good Luck!</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

// Define styles outside the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4b6043',
    },
    questionBox: {
      marginBottom: 20,
      backgroundColor: '#4A2511',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    },
    labelContainer: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },

    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginTop: 10,
    },


  touchableText: {
    textAlign: 'center',
    color: 'green',
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A2511',
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});

export default App;
