import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Screen, Logo, H1, Body, Card, CrownIcon, Pill } from '../components/ui';
import { useAuth } from '../lib/auth';
import { colors, fonts } from '../theme';

export default function RoleSelectScreen() {
  const { chooseRole } = useAuth();

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 22, marginBottom: 24 }}>
        <CrownIcon size={26} />
        <Logo size={34} />
      </View>

      <H1>Who are you stepping in as?</H1>
      <Body style={{ marginTop: 8, marginBottom: 26 }}>
        Choose your portal to continue. You can switch roles anytime.
      </Body>

      {/* Creator Card */}
      <Pressable
        onPress={() => chooseRole('creator')}
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}
      >
        <Card
          style={{
            borderColor: colors.sage,
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 22,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Pill text="FOR CREATORS" color={colors.sage} />
            <Text style={{ fontFamily: fonts.bodyBold, color: colors.sage, fontSize: 18 }}>→</Text>
          </View>
          <Text style={{ fontFamily: fonts.display, fontSize: 28, color: colors.ink, marginBottom: 6 }}>
            I am a Creator
          </Text>
          <Body style={{ fontSize: 14 }}>
            Shop partner brands, post your authentic review on Instagram, build your Crownd Score, and unlock instant cashback.
          </Body>
        </Card>
      </Pressable>

      {/* Brand Card */}
      <Pressable
        onPress={() => chooseRole('brand')}
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}
      >
        <Card
          style={{
            borderColor: colors.crimson,
            borderWidth: 1.5,
            backgroundColor: '#FFF5F7',
            padding: 22,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Pill text="FOR BRANDS" color={colors.crimson} />
            <Text style={{ fontFamily: fonts.bodyBold, color: colors.crimson, fontSize: 18 }}>→</Text>
          </View>
          <Text style={{ fontFamily: fonts.display, fontSize: 28, color: colors.crimsonDark, marginBottom: 6 }}>
            I am a Brand
          </Text>
          <Body style={{ fontSize: 14, color: '#5D3A44' }}>
            Zero upfront creator fees. Turn real 1K+ follower customers into verified content engines and pay only on verified sales.
          </Body>
        </Card>
      </Pressable>
    </Screen>
  );
}
