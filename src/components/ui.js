import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, fonts } from '../theme';

export function Screen({
  children,
  scroll = true,
  refreshing,
  onRefresh,
  pad = 20,
  top = true,
  variant = 'creator', // 'creator' (mint/peach) | 'brand' (red halo & crimson hue)
}) {
  const gradientColors =
    variant === 'brand'
      ? ['#FADCE4', '#FDF1F4', '#F5CCD7']
      : [colors.mint, '#EFF6F2', colors.peach];

  const body = scroll ? (
    <ScrollView
      contentContainerStyle={{ padding: pad, paddingBottom: 48 }}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} tintColor={colors.crimson} />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, padding: pad }}>{children}</View>
  );

  return (
    <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      {variant === 'brand' && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -90,
            right: -70,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: 'rgba(168, 42, 78, 0.20)',
          }}
        />
      )}
      <SafeAreaView style={{ flex: 1 }} edges={top ? ['top', 'left', 'right'] : ['left', 'right']}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {body}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export const Logo = ({ size = 28 }) => (
  <Text style={{ fontFamily: fonts.display, fontSize: size, color: colors.crimson }}>
    crow<Text style={{ color: colors.sage }}>nd</Text>
  </Text>
);

export function CrownIcon({ size = 22, color = colors.crimson, accent = colors.gold }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 24" fill="none">
      <Path
        d="M2.5 18.5L4.5 7.5L10.2 12.5L14 5L17.8 12.5L23.5 7.5L25.5 18.5H2.5Z"
        fill={color}
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <Path d="M3 21H25" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <Circle cx="4.5" cy="6" r="1.7" fill={accent} />
      <Circle cx="14" cy="3.5" r="2" fill={accent} />
      <Circle cx="23.5" cy="6" r="1.7" fill={accent} />
    </Svg>
  );
}

export const H1 = ({ children, style }) => <Text style={[s.h1, style]}>{children}</Text>;
export const Body = ({ children, style }) => <Text style={[s.body, style]}>{children}</Text>;

export function Button({ title, onPress, loading, variant = 'dark', disabled, style }) {
  const bg =
    variant === 'dark'
      ? colors.ink
      : variant === 'crimson'
        ? colors.crimson
        : variant === 'sage'
          ? colors.sage
          : variant === 'gold'
            ? colors.gold
            : 'transparent';
  const fg = variant === 'gold' ? colors.ink : variant === 'ghost' ? colors.ink : '#fff';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        s.btn,
        {
          backgroundColor: bg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.line,
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : <Text style={[s.btnText, { color: fg }]}>{title}</Text>}
    </Pressable>
  );
}

export function Field({ label, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput placeholderTextColor="#9AA5A0" autoCapitalize="none" style={s.input} {...props} />
    </View>
  );
}

export const Card = ({ children, style }) => <View style={[s.card, style]}>{children}</View>;

export function Pill({ text, color = colors.sage }) {
  return (
    <View style={[s.pill, { backgroundColor: color + '22' }]}>
      <Text style={[s.pillText, { color }]}>{text}</Text>
    </View>
  );
}

export const ErrorBox = ({ message }) =>
  message ? (
    <View style={s.err}>
      <Text style={{ color: colors.crimson, fontFamily: fonts.body, fontSize: 14 }}>{message}</Text>
    </View>
  ) : null;

const s = StyleSheet.create({
  h1: { fontFamily: fonts.display, fontSize: 34, lineHeight: 40, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.muted },
  btn: { height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  btnText: { fontFamily: fonts.bodyBold, fontSize: 16 },
  label: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink, marginBottom: 6 },
  input: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    marginBottom: 14,
  },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.4 },
  err: {
    backgroundColor: '#F4E4E8',
    borderWidth: 1,
    borderColor: '#E3B9C4',
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },
});
