import React from 'react';
import { Modal, View, Pressable, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors, fonts } from '../theme';

export default function RazorpayCheckout({
  visible,
  order,
  user,
  description = 'Wallet top-up',
  onSuccess,
  onClose,
  onError,
}) {
  if (!visible || !order) return null;
  const opts = {
    key: order.key_id,
    amount: order.amount,
    currency: order.currency || 'INR',
    order_id: order.order_id,
    name: 'Crownd',
    description,
    prefill: { email: user?.email || '', name: user?.full_name || '' },
    theme: { color: '#A82A4E' },
  };
  const html = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;background:#FBF3EE;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;color:#5E6B66}</style></head>
<body><div id="m">Opening secure checkout…</div>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
var post=function(o){window.ReactNativeWebView.postMessage(JSON.stringify(o))};
try{
  var o=${JSON.stringify(opts)};
  o.handler=function(r){post({type:'success',payload:r})};
  o.modal={ondismiss:function(){post({type:'dismiss'})}};
  var rz=new Razorpay(o);
  rz.on('payment.failed',function(e){post({type:'error',message:(e.error&&e.error.description)||'Payment failed'})});
  rz.open();
}catch(e){post({type:'error',message:'Could not load checkout. Check your connection.'})}
</script></body></html>`;

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: colors.cream, paddingTop: 36 }}>
        <Pressable onPress={onClose} style={{ padding: 16 }}>
          <Text style={{ fontFamily: fonts.bodyBold, color: colors.crimson }}>Cancel</Text>
        </Pressable>
        <WebView
          originWhitelist={['*']}
          source={{ html, baseUrl: 'https://checkout.razorpay.com' }}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          startInLoadingState
          renderLoading={() => <ActivityIndicator style={{ flex: 1 }} color={colors.crimson} />}
          onMessage={(e) => {
            try {
              const m = JSON.parse(e.nativeEvent.data);
              if (m.type === 'success') onSuccess(m.payload);
              else if (m.type === 'dismiss') onClose();
              else if (m.type === 'error') onError(m.message);
            } catch {}
          }}
        />
      </View>
    </Modal>
  );
}
