import React, { useState } from 'react';
import { Text, Linking } from 'react-native';
import { Screen, H1, Body, Card, Field, Button, ErrorBox, Pill } from '../components/ui';
import { api } from '../lib/api';
import { colors, fonts, TIER_LABEL, TIER_COLOR, inr } from '../theme';

export default function BrandScreen({ route, navigation }) {
  const { brand } = route.params;
  const [amount, setAmount] = useState('');
  const [purchase, setPurchase] = useState(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState(null);

  const buy = async () => {
    const n = parseFloat(amount);
    if (!n || n <= 0) return setErr('Enter the purchase amount in rupees.');
    setErr('');
    setBusy(true);
    try {
      setPurchase(await api.initiatePurchase(brand.id, n));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const post = async () => {
    if (!/instagram\.com/i.test(url)) return setErr('Paste the link to your Instagram post.');
    setErr('');
    setBusy(true);
    try {
      setResult(await api.submitPost(purchase.id, url.trim()));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen top={false}>
      <Pill text={(TIER_LABEL[brand.campaign_tier] || '').toUpperCase()} color={TIER_COLOR[brand.campaign_tier]} />
      <H1 style={{ marginTop: 10 }}>{brand.name}</H1>
      <Body style={{ marginVertical: 8 }}>
        {brand.description || 'Shop here, post about it, and earn cashback.'}
      </Body>

      <Card>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.crimson }}>
          {brand.cashback_percentage}% back
        </Text>
        <Body>
          Up to {inr(brand.max_cashback_cap)} per purchase. {brand.max_redemptions_per_user}x per user.
        </Body>
      </Card>

      <ErrorBox message={err} />

      {!purchase && (
        <Card>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink, marginBottom: 10 }}>
            1. Log your purchase
          </Text>
          <Field label="Amount paid (₹)" keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="2500" />
          <Body style={{ fontSize: 13, marginBottom: 12 }}>
            The amount is paid from your Crownd wallet. Top up first if your balance is low.
          </Body>
          <Button title="Pay from wallet" variant="crimson" onPress={buy} loading={busy} />
        </Card>
      )}

      {purchase && !result && (
        <Card>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink, marginBottom: 6 }}>
            2. Post it on Instagram
          </Text>
          <Body style={{ marginBottom: 12 }}>
            Purchase logged{purchase.is_first_purchase ? ' (first-purchase bonus applied)' : ''}. Post about it, tag{' '}
            {brand.name}, then paste the link. Cashback of {inr(purchase.cashback_amount)} is released once the post is verified.
          </Body>
          <Field label="Instagram post link" placeholder="https://instagram.com/p/..." value={url} onChangeText={setUrl} />
          <Button title="Verify my post" variant="crimson" onPress={post} loading={busy} />
          <Button
            title="Open Instagram"
            variant="ghost"
            onPress={() =>
              Linking.openURL('instagram://camera').catch(() => Linking.openURL('https://instagram.com'))
            }
            style={{ marginTop: 10 }}
          />
        </Card>
      )}

      {result && (
        <Card>
          <Text
            style={{
              fontFamily: fonts.display,
              fontSize: 24,
              color: result.verified ? colors.good : colors.crimson,
            }}
          >
            {result.verified ? 'Post verified.' : 'Not verified yet.'}
          </Text>
          <Body style={{ marginVertical: 8 }}>
            {result.message}
            {result.cashback_amount ? ` ${inr(result.cashback_amount)} is now in your wallet.` : ''}
          </Body>
          <Button title="Back to campaigns" onPress={() => navigation.popToTop()} />
        </Card>
      )}
    </Screen>
  );
}
