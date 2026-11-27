import React, { useCallback, useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Screen, H1, Body, Card, Field, Button, ErrorBox } from '../components/ui';
import RazorpayCheckout from '../components/RazorpayCheckout';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { colors, fonts, inr } from '../theme';

const FILTERS = [
  ['all', 'All'],
  ['cashback', 'Cashback'],
  ['topup', 'Top-ups'],
  ['payment', 'Payments'],
];
const PRESETS = [100, 250, 500, 1000, 2000];

function Sheet({ visible, onClose, children }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: 'rgba(28,35,33,0.55)', justifyContent: 'center', padding: 22 }}
      >
        <Pressable onPress={() => {}} style={{ backgroundColor: colors.cream, borderRadius: 28, padding: 22 }}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function WalletScreen() {
  const { user, confirmPassword } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [unlocked, setUnlocked] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [pwBusy, setPwBusy] = useState(false);

  const [topOpen, setTopOpen] = useState(false);
  const [amount, setAmount] = useState('500');
  const [topBusy, setTopBusy] = useState(false);
  const [order, setOrder] = useState(null);

  const load = useCallback(async () => {
    setErr('');
    try {
      const [w, t] = await Promise.all([api.wallet(), api.transactions().catch(() => [])]);
      setWallet(w);
      setTxns(t || []);
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

  const unlock = async () => {
    setPwErr('');
    setPwBusy(true);
    try {
      await confirmPassword(pw);
      setUnlocked(true);
      setPwOpen(false);
      setPw('');
    } catch {
      setPwErr('That password does not match. Try again.');
    } finally {
      setPwBusy(false);
    }
  };

  const startTopup = async () => {
    const n = parseFloat(amount);
    if (!n || n < 1) return setErr('Enter an amount of at least ₹1.');
    setErr('');
    setTopBusy(true);
    try {
      setOrder(await api.loadWallet(n));
      setTopOpen(false);
    } catch (e) {
      setErr(e.message);
      setTopOpen(false);
    } finally {
      setTopBusy(false);
    }
  };

  const onPaid = async (payload) => {
    setOrder(null);
    try {
      await api.verifyPayment(payload);
      await load();
    } catch (e) {
      setErr('Payment went through but we could not confirm it: ' + e.message);
    }
  };

  const list = txns.filter((t) => filter === 'all' || t.type === filter);

  return (
    <Screen top={false} refreshing={loading} onRefresh={load}>
      <Body style={{ color: colors.sage, fontFamily: fonts.bodyMedium }}>CROWND WALLET</Body>
      <H1 style={{ marginBottom: 14 }}>Your cashback vault</H1>
      <ErrorBox message={err} />

      <Card style={{ backgroundColor: colors.crimsonDark }}>
        <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 12, color: '#E3B9C4', letterSpacing: 1 }}>
          AVAILABLE BALANCE
        </Text>
        <Text style={{ fontFamily: fonts.displayRegular, fontSize: 40, color: '#fff' }}>
          {unlocked ? inr(wallet?.balance) : '₹ ••••'}
        </Text>
        <Text style={{ fontFamily: fonts.body, color: '#E3B9C4', marginBottom: 14 }}>
          {unlocked
            ? `Total cashback earned: ${inr(wallet?.total_cashback_earned)}`
            : 'Locked. Confirm your password to view.'}
        </Text>
        {unlocked ? (
          <Button title="Add money" variant="gold" onPress={() => setTopOpen(true)} />
        ) : (
          <Button title="Unlock wallet" variant="gold" onPress={() => setPwOpen(true)} />
        )}
      </Card>

      <H1 style={{ fontSize: 24, marginVertical: 8 }}>Transaction history</H1>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {FILTERS.map(([k, t]) => (
          <Pressable
            key={k}
            onPress={() => setFilter(k)}
            style={{
              paddingHorizontal: 14,
              height: 34,
              borderRadius: 17,
              justifyContent: 'center',
              backgroundColor: filter === k ? colors.ink : '#fff',
            }}
          >
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: filter === k ? '#fff' : colors.muted }}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>

      {list.length === 0 && <Body>Nothing here yet. Top up or earn cashback and it will show up.</Body>}

      {list.map((t) => {
        const credit = t.type === 'cashback' || t.type === 'topup';
        return (
          <Card key={t.id} style={{ padding: 14, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink, textTransform: 'capitalize' }}>
                  {t.description || t.type}
                </Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.muted }}>
                  {t.created_at ? new Date(t.created_at).toLocaleDateString() : ''}
                </Text>
              </View>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: credit ? colors.good : colors.crimson }}>
                {credit ? '+' : '-'}
                {inr(t.amount)}
              </Text>
            </View>
          </Card>
        );
      })}

      {/* Password Unlock Modal */}
      <Sheet visible={pwOpen} onClose={() => setPwOpen(false)}>
        <H1 style={{ fontSize: 24, marginBottom: 6 }}>Unlock wallet</H1>
        <Body style={{ marginBottom: 14 }}>Confirm your Crownd account password to view balance and add funds.</Body>
        <ErrorBox message={pwErr} />
        <Field label="Password" secureTextEntry value={pw} onChangeText={setPw} placeholder="••••••••" />
        <Button title="Unlock" variant="crimson" onPress={unlock} loading={pwBusy} />
      </Sheet>

      {/* Top-up Modal */}
      <Sheet visible={topOpen} onClose={() => setTopOpen(false)}>
        <H1 style={{ fontSize: 24, marginBottom: 6 }}>Top up wallet</H1>
        <Body style={{ marginBottom: 14 }}>Choose a preset or enter a custom amount in INR.</Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {PRESETS.map((p) => (
            <Pressable
              key={p}
              onPress={() => setAmount(String(p))}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: Number(amount) === p ? colors.crimson : '#fff',
                borderWidth: 1,
                borderColor: colors.line,
              }}
            >
              <Text style={{ fontFamily: fonts.bodyBold, color: Number(amount) === p ? '#fff' : colors.ink }}>
                {inr(p)}
              </Text>
            </Pressable>
          ))}
        </View>
        <Field label="Amount (₹)" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        <Button title="Proceed to Razorpay" variant="crimson" onPress={startTopup} loading={topBusy} />
      </Sheet>

      <RazorpayCheckout
        visible={!!order}
        order={order}
        user={user}
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
