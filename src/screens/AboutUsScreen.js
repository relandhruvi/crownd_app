import React from 'react';
import { View, Text } from 'react-native';
import { Screen, H1, Body, Card, Pill, Button, CrownIcon } from '../components/ui';
import { colors, fonts } from '../theme';

const CATEGORIES = [
  { title: 'Beauty & Skincare', rate: 'Up to 35% back', desc: 'Serums, cleansers, cosmetics, haircare, and clean beauty routines.' },
  { title: 'Fashion & Streetwear', rate: 'Up to 30% back', desc: 'Everyday essentials, indie labels, footwear, and accessories.' },
  { title: 'Cafés, Dining & Artisanal Food', rate: 'Up to 40% back', desc: 'Specialty coffee, matcha bars, healthy snacks, and boutique eateries.' },
  { title: 'Fitness & Wellness', rate: 'Up to 25% back', desc: 'Supplements, activewear, studio classes, and recovery gear.' },
  { title: 'Tech & Lifestyle Gear', rate: 'Up to 20% back', desc: 'Desk setups, audio accessories, phone cases, and creator tools.' },
];

export default function AboutUsScreen({ navigation }) {
  return (
    <Screen top={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <CrownIcon size={20} />
        <Pill text="ABOUT CROWND" color={colors.crimson} />
      </View>

      <H1 style={{ marginBottom: 10 }}>Influence rewarded, not gated.</H1>
      <Body style={{ marginBottom: 18 }}>
        Crownd turns your everyday purchases into creator earnings. Instead of waiting months for brand agencies or rigid briefs, you shop brands you genuinely love, share an authentic Instagram post, and receive direct cashback into your Crownd Wallet.
      </Body>

      <Card style={{ backgroundColor: colors.crimsonDark }}>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: '#F3C9D3', letterSpacing: 1 }}>
          WHY CREATORS LOVE CROWND
        </Text>
        <Text style={{ fontFamily: fonts.display, fontSize: 24, color: '#fff', marginTop: 6, marginBottom: 8 }}>
          Built for real voices with 1,000+ followers
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: '#F8DDE3' }}>
          No awkward scripts. No chasing invoices. Every verified post boosts your Crownd Score and unlocks higher cashback caps across partner brands.
        </Text>
      </Card>

      <H1 style={{ fontSize: 24, marginTop: 8, marginBottom: 12 }}>What you can earn cashback on</H1>

      {CATEGORIES.map((item) => (
        <Card key={item.title} style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink, flex: 1 }}>
              {item.title}
            </Text>
            <Pill text={item.rate} color={colors.sage} />
          </View>
          <Body style={{ fontSize: 13 }}>{item.desc}</Body>
        </Card>
      ))}

      <Button
        title="See How It Works"
        variant="crimson"
        onPress={() => navigation.navigate('HowItWorks')}
        style={{ marginTop: 6 }}
      />
    </Screen>
  );
}
