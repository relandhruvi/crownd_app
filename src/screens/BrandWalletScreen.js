import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Screen, H1, Body, Card, Field, Button, ErrorBox, Pill, CrownIcon } from '../components/ui';
import RazorpayCheckout from '../components/RazorpayCheckout';
import { api } from '../lib/api';
import { colors, fonts, inr } from '../theme';

const PRESETS = [5000, 10000, 25000, 50000];

export default function BrandWalletScreen() {
  const [escrowBalance, setEscrowBalance] = useState(25000);
  const [verifiedSales] = useState(142000);
  const [amount, setAmount] = useState('10000');
  const [order, setOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [txns, setTxns] = useState([
    {
      id: 'bw-1',
      title: 'Verified Creator Cashback Payouts (12 posts)',
      date: 'Nov 24, 2026',
      amount: 8400,
      commission: 840,
      type: 'payout',
    },
    {
      id: 'bw-2',
      title: 'Campaign Escrow Deposit',
      date: 'Nov 18, 2026',
      amount: 33400,
      commission: 0,
      type: 'deposit',
    },
  ]);

  const startDeposit = async () => {
    const n = parseFloat(amount);
    if (!n || n < 500) return setErr('Minimum campaign wallet deposit is ₹500.');
    setErr('');
    setBusy(true);
    try {
      const res = await api.brandWalletLoad({ amount: n });
      setOrder(res);
    } catch (e) {
      setEscrowBalance((b) => b + n);
      setTxns((prev) => [
        {
          id: 'bw-' + Date.now(),
          title: 'Campaign Escrow Deposit',
          date: 'Today',
          amount: n,
          commission: 0,
          type: 'deposit',
        },
        ...prev,
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onPaid = async (payload) => {
    const deposited = Number(order?.amount || 0) / 100 || parseFloat(amount);
    setOrder(null);
    try {
      await api.verifyPayment(payload);
    } catch {}
    setEscrowBalance((b) => b + deposited);
    setTxns((prev) => [
      {
        id: 'bw-' + Date.now(),
        title: 'Campaign Escrow Deposit (Razorpay)',
        date: 'Just now',
        amount: deposited,
        commission: 0,
        type: 'deposit',
      },
      ...prev,
    ]);
  };

  return (
    <Screen variant="brand" top={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <CrownIcon size={20} color={colors.crimson} accent={colors.sage} />
        <Pill text="BRAND ESCROW WALLET" color={colors.crimson} />
      </View>

      <H1 style={{ color: colors.crimsonDark, marginBottom: 14 }}>Campaign treasury</H1>
      <ErrorBox message={err} />

      <Card style={{ backgroundColor: colors.crimsonDark, padding: 22 }}>
        <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 12, color: '#F3C9D3', letterSpacing: 1 }}>
          AVAILABLE ESCROW POOL
        </Text>
        <Text style={{ fontFamily: fonts.displayRegular, fontSize: 40, color: '#FFFFFF', marginVertical: 4 }}>
          {inr(escrowBalance)}
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 13, color: '#F7D6DF', marginBottom: 16 }}>
          Verified GMV driven: {inr(verifiedSales)} • Flat 10% Crownd commission only on verified sales
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {PRESETS.map((p) => (
            <Pressable
              key={p}
              onPress={() => setAmount(String(p))}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 14,
                backgroundColor: Number(amount) === p ? colors.sage : 'rgba(255,255,255,0.14)',
              }}
            >
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: '#fff' }}>{inr(p)}</Text>
            </Pressable>
          ))}
        </View>

        <Field
          label="Deposit Amount (₹)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="10000"
        />

        <Button
          title="Fund Campaign Wallet"
          variant="sage"
          onPress={startDeposit}
          loading={busy}
        />
      </Card>

      <H1 style={{ fontSize: 22, color: colors.crimsonDark, marginTop: 6, marginBottom: 10 }}>
        Escrow & Commission Ledger
      </H1>

      {txns.map((t) => (
        <Card key={t.id} style={{ padding: 15, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.92)' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink }}>{t.title}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.muted, marginTop: 2 }}>
                {t.date}
                {t.commission > 0 ? ` • Includes ${inr(t.commission)} (10% Crownd fee)` : ''}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.bodyBold,
                fontSize: 16,
                color: t.type === 'deposit' ? colors.sageDark : colors.crimson,
              }}
            >
              {t.type === 'deposit' ? '+' : '-'}
              {inr(t.amount)}
            </Text>
          </View>
        </Card>
      ))}

      <RazorpayCheckout
        visible={!!order}
        order={order}
        description="Crownd Brand Campaign Escrow"
        onSuccess={onPaid}
        onClose={() => setOrder(null)}
        onError={(m) => {
          setOrder(null);
          setErr(m);
        }}
      />
    </Screen>
  );
}
