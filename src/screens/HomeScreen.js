import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function HomeScreen({ categories, totalQuestions, bestScore, onStartFull, onStartShort, onStartCategory, onExit }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.cover}>
        <View style={styles.coverBar} />
        <View style={styles.eyebrow}>
          <View style={styles.dot} />
          <Text style={styles.eyebrowText}>PREPARAÇÃO PARA CONCURSO PÚBLICO</Text>
        </View>
        <Text style={styles.title}>Dossiê de Estudo{'\n'}Ministério do Interior</Text>
        <Text style={styles.subtitle}>
          Banco de questões de escolha múltipla organizado por matéria, para treino
          sistemático rumo ao concurso do MININT.
        </Text>

        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{totalQuestions}</Text>
            <Text style={styles.statLbl}>Perguntas</Text>
          </View>
          <View style={[styles.stat, styles.statBorder]}>
            <Text style={styles.statNum}>{categories.length}</Text>
            <Text style={styles.statLbl}>Matérias</Text>
          </View>
          <View style={[styles.stat, styles.statBorder]}>
            <Text style={styles.statNum}>{bestScore !== null ? `${bestScore}%` : '—'}</Text>
            <Text style={styles.statLbl}>Melhor resultado</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionLabel}>EXAME</Text>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={onStartFull}>
          <Text style={styles.btnText}>Exame completo (300)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onStartShort}>
          <Text style={[styles.btnText, styles.btnSecondaryText]}>Simulado rápido (30)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>ESTUDAR POR MATÉRIA</Text>
      <View style={{ gap: 8 }}>
        {categories.map((cat, i) => (
          <TouchableOpacity key={cat.name} style={styles.catCard} onPress={() => onStartCategory(cat.name)}>
            <Text style={styles.catCode}>{String(i + 1).padStart(2, '0')}</Text>
            <Text style={styles.catName}>{cat.name}</Text>
            <Text style={styles.catCount}>{cat.count} perg.</Text>
            <Text style={styles.catArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {Platform.OS === 'android' && (
        <View style={[styles.btnRow, { marginTop: 22 }]}>
          <TouchableOpacity style={styles.exitBtn} onPress={onExit}>
            <Text style={styles.exitBtnText}>Sair da aplicação</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>PRODUÇÃO 3LETRAS</Text>
        <Text style={styles.footerCredits}>Moisés Zombo · Santo da Costa</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink, padding: 20 },
  cover: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 20,
    marginBottom: 22,
    overflow: 'hidden',
  },
  coverBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: colors.gold },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  eyebrowText: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, color: colors.gold },
  title: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 25, lineHeight: 31, color: '#fff', marginBottom: 8 },
  subtitle: { color: colors.textDim, fontSize: 14, lineHeight: 21 },
  statRow: { flexDirection: 'row', marginTop: 20, borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 16 },
  stat: { flex: 1 },
  statBorder: { borderLeftWidth: 1, borderLeftColor: colors.line, paddingLeft: 14, marginLeft: 14 },
  statNum: { fontFamily: fonts.mono, fontSize: 19, color: colors.goldBright, fontWeight: '700' },
  statLbl: { fontSize: 10.5, color: colors.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 3 },
  sectionLabel: {
    fontFamily: fonts.mono, fontSize: 11, color: colors.textFaint, letterSpacing: 1.2,
    textTransform: 'uppercase', marginTop: 22, marginBottom: 10,
  },
  btnRow: { marginBottom: 10 },
  btn: { backgroundColor: colors.gold, borderRadius: 4, paddingVertical: 14, alignItems: 'center' },
  btnText: { color: '#191300', fontWeight: '700', fontSize: 15 },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.line },
  btnSecondaryText: { color: colors.text, fontWeight: '500' },
  catCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
    borderLeftWidth: 3, borderLeftColor: colors.goldDim,
    borderRadius: 4, paddingVertical: 14, paddingHorizontal: 16,
  },
  catCode: { fontFamily: fonts.mono, fontSize: 12, color: colors.gold, width: 22 },
  catName: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.text },
  catCount: { fontFamily: fonts.mono, fontSize: 11.5, color: colors.textFaint, marginRight: 6 },
  catArrow: { color: colors.textFaint, fontSize: 14 },
  exitBtn: { borderWidth: 1, borderColor: colors.bad, borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  exitBtnText: { color: colors.bad, fontWeight: '600', fontSize: 13.5 },
  footer: { alignItems: 'center', marginTop: 30, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.line },
  footerBrand: { fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: 1.5, color: colors.goldDim, marginBottom: 4 },
  footerCredits: { fontSize: 11, color: colors.textFaint },
});
