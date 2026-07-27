import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function ResultsScreen({ questions, answers, onHome }) {
  const [showReview, setShowReview] = useState(false);

  let correctCount = 0;
  const catStats = {};
  const wrongItems = [];

  questions.forEach((q, i) => {
    const given = answers[i];
    const isCorrect = given === q.correct;
    if (isCorrect) correctCount++;
    if (!catStats[q.category]) catStats[q.category] = { correct: 0, total: 0 };
    catStats[q.category].total++;
    if (isCorrect) catStats[q.category].correct++;
    else wrongItems.push({ q, given });
  });

  const total = questions.length;
  const pct = Math.round((correctCount / total) * 100);
  const msg =
    pct >= 80 ? 'Excelente domínio das matérias. Continua a praticar para consolidar.'
    : pct >= 60 ? 'Bom desempenho. Reforça as matérias com mais erros abaixo.'
    : 'Ainda há trabalho a fazer — revê as matérias com mais erros e volta a tentar.';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={[styles.cover, { alignItems: 'center' }]}>
        <View style={styles.eyebrow}>
          <View style={styles.dot} />
          <Text style={styles.eyebrowText}>RESULTADO DO EXAME</Text>
        </View>
        <View style={styles.seal}>
          <Text style={styles.sealPct}>{pct}%</Text>
          <Text style={styles.sealOf}>{correctCount}/{total}</Text>
        </View>
        <Text style={styles.msg}>{msg}</Text>
      </View>

      <Text style={styles.sectionLabel}>DESEMPENHO POR MATÉRIA</Text>
      <View style={{ gap: 10, marginBottom: 20 }}>
        {Object.keys(catStats).map((cat) => {
          const s = catStats[cat];
          const p = Math.round((s.correct / s.total) * 100);
          return (
            <View key={cat}>
              <View style={styles.bdTop}>
                <Text style={styles.bdName}>{cat}</Text>
                <Text style={styles.bdScore}>{s.correct}/{s.total}</Text>
              </View>
              <View style={styles.bdTrack}>
                <View style={[styles.bdFill, { width: `${p}%` }]} />
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={onHome}>
          <Text style={styles.btnText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => setShowReview(!showReview)}>
          <Text style={[styles.btnText, styles.btnSecondaryText]}>{showReview ? 'Ocultar revisão' : 'Rever erros'}</Text>
        </TouchableOpacity>
      </View>

      {showReview && (
        <View style={{ marginTop: 12 }}>
          {wrongItems.length === 0 ? (
            <Text style={styles.muted}>Sem erros a rever — resultado perfeito.</Text>
          ) : (
            wrongItems.map(({ q, given }, i) => (
              <View key={i} style={styles.reviewItem}>
                <Text style={styles.reviewQ}>{q.question}</Text>
                <Text style={styles.reviewAnswer}>
                  A tua resposta: <Text style={styles.yourWrong}>{given === null ? '(sem resposta)' : q.options[given]}</Text>
                  {'\n'}Resposta correcta: <Text style={styles.correctText}>{q.options[q.correct]}</Text>
                </Text>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink, padding: 20 },
  cover: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: 6, padding: 22, marginBottom: 20 },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  eyebrowText: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, color: colors.gold },
  seal: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  sealPct: { fontFamily: fonts.mono, fontSize: 26, color: colors.goldBright, fontWeight: '700' },
  sealOf: { fontFamily: fonts.mono, fontSize: 10, color: colors.textFaint },
  msg: { color: colors.textDim, fontSize: 13.5, textAlign: 'center', lineHeight: 20 },
  sectionLabel: {
    fontFamily: fonts.mono, fontSize: 11, color: colors.textFaint, letterSpacing: 1.2,
    textTransform: 'uppercase', marginBottom: 10,
  },
  bdTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  bdName: { color: colors.textDim, fontSize: 12.5 },
  bdScore: { fontFamily: fonts.mono, color: colors.text, fontSize: 12.5 },
  bdTrack: { height: 5, backgroundColor: colors.surface3, borderRadius: 3, overflow: 'hidden' },
  bdFill: { height: '100%', backgroundColor: colors.goldDim },
  btnRow: { marginBottom: 10 },
  btn: { backgroundColor: colors.gold, borderRadius: 4, paddingVertical: 14, alignItems: 'center' },
  btnText: { color: '#191300', fontWeight: '700', fontSize: 15 },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.line },
  btnSecondaryText: { color: colors.text, fontWeight: '500' },
  muted: { color: colors.textFaint, fontSize: 12.5, textAlign: 'center' },
  reviewItem: { borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: 14 },
  reviewQ: { fontSize: 13.5, color: colors.text, marginBottom: 8 },
  reviewAnswer: { fontSize: 12, color: colors.textDim, lineHeight: 19 },
  yourWrong: { color: colors.bad },
  correctText: { color: colors.ok, fontWeight: '600' },
});
