import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";


const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <ScrollView style={styles.questionBox}>
        <Text>{label}</Text>
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
        <Icon name={"paw"} size={20} color={'green'}><Text>Charmaine's Quiz</Text></Icon>
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
        <Button title="Submit Answers" onPress={Submit} />
        <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
          <Text style={styles.touchableText}>Good Luck!</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  questionBox: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  touchableText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
