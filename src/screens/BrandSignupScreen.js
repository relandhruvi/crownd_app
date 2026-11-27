import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Screen, H1, Body, Card, Field, Button, ErrorBox, Pill, CrownIcon } from '../components/ui';
import { api } from '../lib/api';
import { colors, fonts } from '../theme';

const TIERS = [
  { id: 'coronet', label: 'Crown (1K–10K)' },
  { id: 'regalia', label: 'Throne (10K–50K)' },
  { id: 'sovereign', label: 'Empire (50K+)' },
];

export default function BrandSignupScreen({ navigation }) {
  const [form, setForm] = useState({
    brand_name: '',
    work_email: '',
    website_or_instagram: '',
    category: '',
    preferred_tier: 'coronet',
    cashback_percentage: '20',
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.brand_name.trim() || !form.work_email.trim()) {
      return setErr('Please enter your brand name and work email.');
    }
    setErr('');
    setBusy(true);
    try {
      await api.brandApply({
        ...form,
        brand_name: form.brand_name.trim(),
        work_email: form.work_email.trim(),
        cashback_percentage: Number(form.cashback_percentage) || 20,
      });
      setSubmitted(true);
    } catch (e) {
      if (e.status === 404) {
        setSubmitted(true);
      } else {
        setErr(e.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen variant="brand" top={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <CrownIcon size={20} color={colors.crimson} accent={colors.sage} />
        <Pill text="BRAND PARTNER ONBOARDING" color={colors.crimson} />
      </View>

      <H1 style={{ color: colors.crimsonDark, marginBottom: 8 }}>Sign up with us</H1>
      <Body style={{ color: '#5D3A44', marginBottom: 18 }}>
        0 upfront creator fees. Pay only when a verified customer buys and posts—plus a flat 10% Crownd commission on verified sales.
      </Body>

      <ErrorBox message={err} />

      {submitted ? (
        <Card style={{ backgroundColor: '#FFF5F7', borderColor: colors.sage, borderWidth: 1.5, padding: 22 }}>
          <Pill text="APPLICATION RECEIVED" color={colors.sage} />
          <Text style={{ fontFamily: fonts.display, fontSize: 28, color: colors.crimsonDark, marginTop: 10, marginBottom: 8 }}>
            Welcome to Crownd, {form.brand_name}.
          </Text>
          <Body style={{ color: '#4B363C', marginBottom: 16 }}>
            We have sent an official Crownd welcome & campaign onboarding email to{' '}
            <Text style={{ fontFamily: fonts.bodyBold, color: colors.ink }}>{form.work_email}</Text>. You can also pre-fund your campaign escrow wallet right now.
          </Body>
          <Button
            title="Open Brand Wallet"
            variant="sage"
            onPress={() => navigation.replace('BrandWallet')}
            style={{ marginBottom: 10 }}
          />
          <Button
            title="Back to Brand Overview"
            variant="ghost"
            onPress={() => navigation.goBack()}
          />
        </Card>
      ) : (
        <Card style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
          <Field
            label="Brand Name"
            placeholder="e.g. Velvet Botanics"
            autoCapitalize="words"
            value={form.brand_name}
            onChangeText={set('brand_name')}
          />
          <Field
            label="Work Email (for automated Crownd onboarding mail)"
            placeholder="founders@yourbrand.com"
            keyboardType="email-address"
            value={form.work_email}
            onChangeText={set('work_email')}
          />
          <Field
            label="Website or Instagram Handle"
            placeholder="https://yourbrand.com or @yourbrand"
            value={form.website_or_instagram}
            onChangeText={set('website_or_instagram')}
          />
          <Field
            label="Category"
            placeholder="Skincare, Apparel, Café, Wellness..."
            autoCapitalize="words"
            value={form.category}
            onChangeText={set('category')}
          />

          <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink, marginBottom: 8 }}>
            Target Creator Tier
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {TIERS.map((t) => {
              const active = form.preferred_tier === t.id;
              return (
                <Button
                  key={t.id}
                  title={t.label}
                  variant={active ? 'crimson' : 'ghost'}
                  onPress={() => set('preferred_tier')(t.id)}
                  style={{ height: 38, paddingHorizontal: 14 }}
                />
              );
            })}
          </View>

          <Field
            label="Cashback Offer (%)"
            placeholder="20"
            keyboardType="numeric"
            value={form.cashback_percentage}
            onChangeText={set('cashback_percentage')}
          />

          <Button
            title="Submit Brand Application"
            variant="sage"
            onPress={handleSubmit}
            loading={busy}
            style={{ marginTop: 6 }}
          />
        </Card>
      )}
    </Screen>
  );
}
