import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Screen, Logo, H1, Body, Card, Pill, Button, CrownIcon } from '../components/ui';
import { useAuth } from '../lib/auth';
import { colors, fonts, TIER_DETAILS } from '../theme';

const BRAND_METRICS = [
  {
    stat: '80%',
    label: 'Lower cost per campaign vs agency-managed influencer spend',
  },
  {
    stat: '1K+',
    label: 'Minimum followers per creator ; real audiences, not bought',
  },
  {
    stat: '0',
    label: 'Upfront content fees. You pay only when a purchase + post both happen',
  },
  {
    stat: '10%',
    label: "Crownd commission on verified sales - that's it",
  },
];

export default function BrandHubScreen({ navigation }) {
  const { resetRole } = useAuth();

  return (
    <Screen variant="brand">
      {/* Top Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <CrownIcon size={24} color={colors.crimson} accent={colors.sage} />
          <Logo size={28} />
        </View>
        <Pressable
          onPress={resetRole}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 16,
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderWidth: 1,
            borderColor: 'rgba(168,42,78,0.2)',
          }}
        >
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.crimson }}>Switch role</Text>
        </Pressable>
      </View>

      {/* Hero Crimson Halo Card */}
      <Card
        style={{
          backgroundColor: colors.crimsonDark,
          borderColor: 'rgba(255,255,255,0.25)',
          padding: 22,
        }}
      >
        <Pill text="CROWND FOR BRANDS" color="#F9C774" />
        <Text style={{ fontFamily: fonts.display, fontSize: 32, lineHeight: 38, color: '#FFFFFF', marginTop: 10, marginBottom: 8 }}>
          Turn paying customers into your loudest creators.
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: '#F7D6DF', marginBottom: 18 }}>
          Launch performance-backed creator campaigns with zero wasted retainer spend. Fund your campaign wallet, set your cashback tier, and approve verified posts.
        </Text>

        {/* Action Buttons: Green minor accent for primary actions */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            title="Sign up with us"
            variant="sage"
            onPress={() => navigation.navigate('BrandSignup')}
            style={{ flex: 1, height: 48 }}
          />
          <Button
            title="Brand Wallet"
            variant="gold"
            onPress={() => navigation.navigate('BrandWallet')}
            style={{ flex: 1, height: 48 }}
          />
        </View>
      </Card>

      {/* 4 Key Value Proposition Stats */}
      <H1 style={{ fontSize: 25, color: colors.crimsonDark, marginTop: 6, marginBottom: 12 }}>
        Why brands switch to Crownd
      </H1>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {BRAND_METRICS.map((m) => (
          <Card
            key={m.stat}
            style={{
              width: '48.2%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderColor: 'rgba(168,42,78,0.22)',
              padding: 16,
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 36, color: colors.crimson, marginBottom: 6 }}>
              {m.stat}
            </Text>
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: colors.ink }}>
              {m.label}
            </Text>
          </Card>
        ))}
      </View>

      {/* Creator Tiers Explained */}
      <H1 style={{ fontSize: 25, color: colors.crimsonDark, marginTop: 10, marginBottom: 6 }}>
        Creator tiers explained
      </H1>
      <Body style={{ color: '#5D3A44', marginBottom: 14 }}>
        Target campaigns by creator tier based on verified reach, Crownd Score, and cashback budget.
      </Body>

      {TIER_DETAILS.map((tier) => (
        <Card
          key={tier.id}
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(168,42,78,0.22)',
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <View>
              <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.crimsonDark }}>
                {tier.name}
              </Text>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.muted }}>
                {tier.followers} • {tier.scoreReq}
              </Text>
            </View>
            <Pill text={tier.cashbackRange} color={colors.sage} />
          </View>
          <Body style={{ fontSize: 13, color: '#4B363C', marginTop: 4 }}>{tier.summary}</Body>
        </Card>
      ))}

      {/* Bottom CTA */}
      <Card style={{ backgroundColor: '#FFF5F7', borderColor: colors.crimson, borderWidth: 1.2, marginTop: 4 }}>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 17, color: colors.crimsonDark, marginBottom: 6 }}>
          Ready to launch your first campaign?
        </Text>
        <Body style={{ fontSize: 13, color: '#5D3A44', marginBottom: 14 }}>
          Register your brand in 60 seconds and get an instant onboarding confirmation email from Crownd.
        </Body>
        <Button
          title="Sign up with us →"
          variant="sage"
          onPress={() => navigation.navigate('BrandSignup')}
        />
      </Card>
    </Screen>
  );
}
