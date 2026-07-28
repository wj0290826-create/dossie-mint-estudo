import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { QUESTIONS } from './src/data/questions';
import { colors } from './src/theme/theme';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const BEST_SCORE_KEY = 'mint-best-score';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'quiz' | 'results'
  const [examQuestions, setExamQuestions] = useState([]);
  const [examAnswers, setExamAnswers] = useState([]);
  const [bestScore, setBestScore] = useState(null);

  const categories = useMemo(() => {
    const counts = {};
    QUESTIONS.forEach((q) => { counts[q.category] = (counts[q.category] || 0) + 1; });
    return Object.keys(counts).map((name) => ({ name, count: counts[name] }));
  }, []);

  useEffect(() => {
    loadBestScore();
  }, []);

  async function loadBestScore() {
    try {
      const raw = await AsyncStorage.getItem(BEST_SCORE_KEY);
      if (raw) setBestScore(JSON.parse(raw).pct);
    } catch (e) {
      // no saved score yet — that's fine
    }
  }

  async function saveBestScore(pct) {
    try {
      const raw = await AsyncStorage.getItem(BEST_SCORE_KEY);
      const cur = raw ? JSON.parse(raw) : null;
      if (!cur || pct > cur.pct) {
        await AsyncStorage.setItem(BEST_SCORE_KEY, JSON.stringify({ pct }));
        setBestScore(pct);
      }
    } catch (e) {
      console.warn('Não foi possível guardar o resultado', e);
    }
  }

  function startExam(mode, category) {
    let pool = QUESTIONS;
    if (mode === 'category') pool = QUESTIONS.filter((q) => q.category === category);
    pool = shuffle(pool);
    if (mode === 'short') pool = pool.slice(0, 30);
    setExamQuestions(pool);
    setScreen('quiz');
  }

  function finishExam(questions, answers) {
    setExamQuestions(questions);
    setExamAnswers(answers);
    const correct = questions.filter((q, i) => answers[i] === q.correct).length;
    const pct = Math.round((correct / questions.length) * 100);
    saveBestScore(pct);
    setScreen('results');
  }

  function goHome() {
    setScreen('home');
  }

  function requestGoHomeFromQuiz() {
    Alert.alert(
      'Voltar ao início?',
      'Vais perder o progresso deste exame.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Voltar ao início', style: 'destructive', onPress: goHome },
      ]
    );
  }

  function requestExitApp() {
    Alert.alert(
      'Sair da aplicação?',
      'Isto vai fechar o Dossiê MININT.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.ink} />
      {screen === 'home' && (
        <HomeScreen
          categories={categories}
          totalQuestions={QUESTIONS.length}
          bestScore={bestScore}
          onStartFull={() => startExam('full')}
          onStartShort={() => startExam('short')}
          onStartCategory={(cat) => startExam('category', cat)}
          onExit={requestExitApp}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen questions={examQuestions} onFinish={finishExam} onHome={requestGoHomeFromQuiz} />
      )}
      {screen === 'results' && (
        <ResultsScreen questions={examQuestions} answers={examAnswers} onHome={goHome} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
});
