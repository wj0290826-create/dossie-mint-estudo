import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/theme';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ questions, onFinish }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);

  const q = questions[index];
  const progress = (index / questions.length) * 100;

  function selectAnswer(i) {
    if (selected !== null) return;
    setSelected(i);
    const next = answers.slice();
    next[index] = i;
    setAnswers(next);
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      onFinish(questions, answers);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.quizHead}>
        <Text style={styles.qCode}>Q-{String(q.id).padStart(3, '0')}</Text>
        <Text style={styles.qProgressTxt}>{index + 1} / {questions.length}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.qCard}>
        <Text style={styles.qCatTag}>{q.category.toUpperCase()}</Text>
        <Text style={styles.qText}>{q.question}</Text>
      </View>

      <View style={{ gap: 9 }}>
        {q.options.map((opt, i) => {
          let optStyle = [styles.opt];
          let letterStyle = [styles.letter];
          if (selected !== null) {
            if (i === q.correct) { optStyle.push(styles.optCorrect); letterStyle.push(styles.letterCorrect); }
            else if (i === selected) { optStyle.push(styles.optWrong); letterStyle.push(styles.letterWrong); }
            else { optStyle.push(styles.optDim); }
          }
          return (
            <TouchableOpacity key={i} style={optStyle} onPress={() => selectAnswer(i)} disabled={selected !== null}>
              <View style={letterStyle}><Text style={styles.letterText}>{LETTERS[i]}</Text></View>
              <Text style={styles.optText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.nextRow}>
        <TouchableOpacity
          style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
          onPress={next}
          disabled={selected === null}
        >
          <Text style={styles.nextBtnText}>{index === questions.length - 1 ? 'Ver resultado' : 'Seguinte →'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink, padding: 20 },
  quizHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  qCode: { fontFamily: fonts.mono, fontSize: 12, color: colors.gold },
  qProgressTxt: { fontFamily: fonts.mono, fontSize: 12, color: colors.textFaint },
  progressTrack: { height: 3, backgroundColor: colors.surface3, borderRadius: 2, overflow: 'hidden', marginBottom: 20 },
  progressFill: { height: '100%', backgroundColor: colors.gold },
  qCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 5, padding: 20, marginBottom: 16 },
  qCatTag: { fontFamily: fonts.mono, fontSize: 10, color: colors.textFaint, letterSpacing: 0.5, marginBottom: 10 },
  qText: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 25, color: '#fff' },
  opt: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
    borderRadius: 4, paddingVertical: 13, paddingHorizontal: 15,
  },
  optCorrect: { borderColor: colors.ok, backgroundColor: colors.okBg },
  optWrong: { borderColor: colors.bad, backgroundColor: colors.badBg },
  optDim: { opacity: 0.5 },
  optText: { flex: 1, fontSize: 14, lineHeight: 20, color: colors.text },
  letter: {
    width: 20, height: 20, borderRadius: 3, borderWidth: 1, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
  letterCorrect: { borderColor: colors.ok },
  letterWrong: { borderColor: colors.bad },
  letterText: { fontFamily: fonts.mono, fontSize: 11, color: colors.textFaint },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 18 },
  nextBtn: { backgroundColor: colors.gold, borderRadius: 4, paddingVertical: 12, paddingHorizontal: 22 },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { color: '#191300', fontWeight: '700', fontSize: 14 },
});
