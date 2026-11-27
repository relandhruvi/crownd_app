import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Screen, Logo, H1, Body, Field, Button, ErrorBox, CrownIcon } from '../components/ui';
import { useAuth } from '../lib/auth';
import { colors, fonts } from '../theme';

export default function AuthScreen({ navigation }) {
  const { signIn, signUp, resetRole } = useAuth();
  const [mode, setMode] = useState('in');
  const [f, setF] = useState({ email: '', password: '', full_name: '', instagram_handle: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [crownMenuOpen, setCrownMenuOpen] = useState(false);

  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setErr('');
    setBusy(true);
    try {
      if (mode === 'in') {
        await signIn(f.email.trim(), f.password);
      } else {
        await signUp({
          ...f,
          email: f.email.trim(),
          instagram_handle: f.instagram_handle.replace('@', '').trim(),
        });
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const openInfoPage = (routeName) => {
    setCrownMenuOpen(false);
    navigation.navigate(routeName);
  };

  return (
    <Screen>
      {/* Top Bar with Switch Role + Crown Shape Toggle */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
        <Pressable
          onPress={resetRole}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 16,
            backgroundColor: 'rgba(255,255,255,0.75)',
            borderWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.muted }}>← Switch role</Text>
        </Pressable>

        {/* Crown-shaped Toggle Button */}
        <Pressable
          onPress={() => setCrownMenuOpen((prev) => !prev)}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: crownMenuOpen ? colors.crimson : '#FFFDF9',
            borderWidth: 1.5,
            borderColor: colors.gold,
            shadowColor: colors.crimson,
            shadowOpacity: 0.14,
            shadowRadius: 8,
            elevation: 3,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          })}
        >
          <CrownIcon
            size={20}
            color={crownMenuOpen ? '#FFFFFF' : colors.crimson}
            accent={colors.gold}
          />
          <Text
            style={{
              fontFamily: fonts.bodyBold,
              fontSize: 12,
              color: crownMenuOpen ? '#FFFFFF' : colors.ink,
            }}
          >
            Explore
          </Text>
        </Pressable>
      </View>

      {/* Crown Toggle Drawer / Menu Modal */}
      <Modal
        visible={crownMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCrownMenuOpen(false)}
      >
        <Pressable
          onPress={() => setCrownMenuOpen(false)}
          style={{ flex: 1, backgroundColor: 'rgba(28,35,33,0.45)', justifyContent: 'flex-start', paddingTop: 78, paddingHorizontal: 20 }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: colors.cream,
              borderRadius: 24,
              padding: 18,
              borderWidth: 1.5,
              borderColor: colors.gold,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <CrownIcon size={20} />
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.crimson, letterSpacing: 0.8 }}>
                DISCOVER CROWND
              </Text>
            </View>

            <Pressable
              onPress={() => openInfoPage('AboutUs')}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#F2E6DF' : '#FFFFFF',
                borderRadius: 16,
                padding: 15,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: colors.line,
              })}
            >
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }}>
                About Us →
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.muted, marginTop: 2 }}>
                What Crownd is & every category you earn cashback on
              </Text>
            </Pressable>

            <Pressable
              onPress={() => openInfoPage('HowItWorks')}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#F2E6DF' : '#FFFFFF',
                borderRadius: 16,
                padding: 15,
                borderWidth: 1,
                borderColor: colors.line,
              })}
            >
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }}>
                How It Works →
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.muted, marginTop: 2 }}>
                The 3 simple steps & how your Crownd Score unlocks higher tiers
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <View style={{ marginBottom: 22 }}>
        <Logo size={34} />
      </View>

      <H1>{mode === 'in' ? 'Welcome back.' : 'Shop. Post. Get paid.'}</H1>
      <Body style={{ marginTop: 8, marginBottom: 22 }}>
        {mode === 'in'
          ? 'Sign in to check your wallet, your Crownd Score, and what is waiting to be cashed back.'
          : 'Creators with 1,000+ followers earn cashback on what they already buy and post.'}
      </Body>

      <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 26, padding: 4, marginBottom: 20 }}>
        {[
          ['in', 'Sign in'],
          ['up', 'Apply as creator'],
        ].map(([k, t]) => (
          <Pressable
            key={k}
            onPress={() => {
              setMode(k);
              setErr('');
            }}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: mode === k ? colors.ink : 'transparent',
            }}
          >
            <Text style={{ fontFamily: fonts.bodyBold, color: mode === k ? '#fff' : colors.muted }}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <ErrorBox message={err} />

      {mode === 'up' && (
        <>
          <Field label="Full name" value={f.full_name} onChangeText={set('full_name')} autoCapitalize="words" />
          <Field label="Instagram handle" placeholder="@yourhandle" value={f.instagram_handle} onChangeText={set('instagram_handle')} />
        </>
      )}

      <Field label="Email" placeholder="you@example.com" keyboardType="email-address" value={f.email} onChangeText={set('email')} />
      <Field label="Password" secureTextEntry placeholder="••••••••" value={f.password} onChangeText={set('password')} />

      <Button title={mode === 'in' ? 'Sign in' : 'Create account'} onPress={submit} loading={busy} style={{ marginTop: 6 }} />
    </Screen>
  );
}
