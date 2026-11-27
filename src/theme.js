export const colors = {
  mint: '#E8F4F0',
  peach: '#F3DCC8',
  cream: '#FBF3EE',
  ink: '#1C2321',
  crimson: '#A82A4E',
  crimsonDark: '#6F1A32',
  crimsonSoft: '#F9E6EC',
  crimsonHalo: 'rgba(168, 42, 78, 0.16)',
  sage: '#7A9168',
  sageDark: '#4D613E',
  gold: '#F9C774',
  muted: '#5E6B66',
  line: 'rgba(28,35,33,0.10)',
  card: 'rgba(255,255,255,0.82)',
  good: '#1E8A5E',
};

export const fonts = {
  display: 'PlayfairDisplay_700Bold_Italic',
  displayRegular: 'PlayfairDisplay_700Bold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodyBold: 'DMSans_700Bold',
};

// Backend tier ids vs. the names shown in the UI
export const TIER_LABEL = { coronet: 'Crown', regalia: 'Throne', sovereign: 'Empire' };
export const TIER_COLOR = { coronet: '#1E8A5E', regalia: '#6B5BD2', sovereign: '#C98A12' };

export const TIER_DETAILS = [
  {
    id: 'coronet',
    name: 'Crown',
    backendId: 'Coronet',
    followers: '1K – 10K Followers',
    scoreReq: 'Score 0+',
    cashbackRange: '10% – 20% Cashback',
    color: '#1E8A5E',
    summary: 'Everyday nano & micro-creators with high-trust friend circles and hyper-local engagement.',
  },
  {
    id: 'regalia',
    name: 'Throne',
    backendId: 'Regalia',
    followers: '10K – 50K Followers',
    scoreReq: 'Score 45+',
    cashbackRange: '20% – 35% Cashback',
    color: '#6B5BD2',
    summary: 'Established niche tastemakers driving consistent saves, shares, and repeat brand discovery.',
  },
  {
    id: 'sovereign',
    name: 'Empire',
    backendId: 'Sovereign',
    followers: '50K+ Followers',
    scoreReq: 'Score 75+',
    cashbackRange: '35% – 50% Cashback',
    color: '#C98A12',
    summary: 'Top-performing cultural voices with verified conversion velocity and flagship campaign priority.',
  },
];

export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
