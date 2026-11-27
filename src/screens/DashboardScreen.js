import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Screen, Logo, H1, Body, Card, Pill, Button, ErrorBox, CrownIcon } from '../components/ui';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { colors, fonts, TIER_LABEL, TIER_COLOR, inr } from '../theme';

export default function DashboardScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [score, setScore] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [brands, setBrands] = useState([]);
  const [eligible, setEligible] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    setErr('');
    try {
      const [sc, w, all, el] = await Promise.all([
        api.score().catch(() => null),
        api.wallet().catch(() => null),
        api.brands(),
        api.eligibleBrands().catch(() => null),
      ]);
      setScore(sc);
      setWallet(w);
      setBrands(all || []);
      setEligible(new Set((el || all || []).map((b) => b.id)));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const first = (user?.full_name || user?.email || 'there').split(/[ @]/)[0];

  return (
    <Screen refreshing={loading} onRefresh={load}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <CrownIcon size={22} />
          <Logo />
        </View>
        <Pressable onPress={signOut}>
          <Text style={{ fontFamily: fonts.bodyBold, color: colors.muted }}>Sign out</Text>
        </Pressable>
      </View>

      <Card>
        <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.sage, letterSpacing: 1 }}>
          CROWND SCORE
        </Text>
        <Text style={{ fontFamily: fonts.display, fontSize: 48, color: colors.crimson }}>
          {score ? score.total_score : '–'}
        </Text>
        <Body>{first}'s influence, measured.</Body>
        {score && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            <Pill text={`${score.total_posts} POSTS`} />
            <Pill text={`${score.verified_posts} VERIFIED`} />
            <Pill text={`${(score.avg_engagement_rate || 0).toFixed(1)}% ENG.`} />
            <Pill text={`${score.unique_brands_posted} BRANDS`} />
          </View>
        )}
      </Card>

      <Pressable onPress={() => navigation.navigate('Wallet')}>
        <Card style={{ backgroundColor: colors.crimson }}>
          <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 12, color: '#F3C9D3', letterSpacing: 1 }}>
            MY WALLET
          </Text>
          <Text style={{ fontFamily: fonts.displayRegular, fontSize: 34, color: '#fff' }}>
            {wallet ? inr(wallet.balance) : '–'}
          </Text>
          <Text style={{ fontFamily: fonts.body, color: '#F3C9D3' }}>
            {wallet ? `${inr(wallet.total_cashback_earned)} total cashback earned` : 'Tap to open your wallet'}
          </Text>
        </Card>
      </Pressable>

      <ErrorBox message={err} />
      <H1 style={{ fontSize: 26, marginVertical: 10 }}>Active campaigns</H1>
      {!loading && brands.length === 0 && !err && (
        <Body>No campaigns are live right now. Pull down to refresh.</Body>
      )}

      {brands.map((b) => {
        const open = eligible.has(b.id);
        return (
          <Card key={b.id} style={{ opacity: open ? 1 : 0.6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 18, color: colors.ink }}>{b.name}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.muted, textTransform: 'capitalize' }}>
                  {b.category || 'Brand'}
                </Text>
              </View>
              <Pill
                text={(TIER_LABEL[b.campaign_tier] || b.campaign_tier).toUpperCase()}
                color={TIER_COLOR[b.campaign_tier]}
              />
            </View>
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.crimson, marginTop: 10 }}>
              {b.cashback_percentage}%{' '}
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.muted }}>
                cashback, up to {inr(b.max_cashback_cap)}
              </Text>
            </Text>
            <Body style={{ fontSize: 13 }}>{b.max_redemptions_per_user}x per user</Body>
            <Button
              title={open ? 'Shop & earn' : `Unlocks at score ${b.min_crownd_score}`}
              disabled={!open}
              onPress={() => navigation.navigate('Brand', { brand: b })}
              style={{ marginTop: 12, height: 46 }}
            />
          </Card>
        );
      })}
    </Screen>
  );
}
