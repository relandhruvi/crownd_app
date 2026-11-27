import React from 'react';
import { View, Text } from 'react-native';
import { Screen, H1, Body, Card, Pill, Button, CrownIcon } from '../components/ui';
import { colors, fonts, TIER_DETAILS } from '../theme';

const STEPS = [
  {
    num: '01',
    title: 'Shop a Partner Brand',
    desc: 'Pick any live campaign you qualify for, top up your Crownd Wallet, and pay seamlessly at checkout.',
  },
  {
    num: '02',
    title: 'Post & Tag on Instagram',
    desc: 'Share your real experience on Instagram, tag the brand handle, and submit the post link inside Crownd.',
  },
  {
    num: '03',
    title: 'Instant Cashback Unlocked',
    desc: 'Once your post is verified, your cashback (plus first-purchase bonuses) drops directly into your wallet.',
  },
];

export default function HowItWorksScreen({ navigation }) {
  return (
    <Screen top={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <CrownIcon size={20} />
        <Pill text="HOW IT WORKS" color={colors.sage} />
      </View>

      <H1 style={{ marginBottom: 10 }}>Three steps from cart to cashback.</H1>
      <Body style={{ marginBottom: 18 }}>
        Every campaign follows a transparent, automated flow so you always know what you will earn before you buy.
      </Body>

      {STEPS.map((step) => (
        <Card key={step.num} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: colors.crimson,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: '#fff' }}>{step.num}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              {step.title}
            </Text>
            <Body style={{ fontSize: 13 }}>{step.desc}</Body>
          </View>
        </Card>
      ))}

      <H1 style={{ fontSize: 25, marginTop: 10, marginBottom: 8 }}>Your Crownd Score</H1>
      <Body style={{ marginBottom: 14 }}>
        Your Crownd Score (0–100) measures real creator credibility—calculated from your verified posts, average engagement rate, and brand diversity. Higher scores unlock Throne and Empire campaigns with bigger cashback caps.
      </Body>

      {TIER_DETAILS.map((t) => (
        <Card key={t.id} style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, color: t.color }}>{t.name} Tier</Text>
            <Pill text={t.scoreReq} color={t.color} />
          </View>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink, marginBottom: 4 }}>
            {t.followers} • {t.cashbackRange}
          </Text>
          <Body style={{ fontSize: 13 }}>{t.summary}</Body>
        </Card>
      ))}

      <Button
        title="Back to Sign In"
        variant="dark"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 6 }}
      />
    </Screen>
  );
}
