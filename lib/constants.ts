export const SITE = {
  name: 'Xai',
  tagline: 'Intelligence Workspace',
  description: 'Transform raw data into structured intelligence and actionable insight.',
} as const;

export const NAV_ITEMS = [
  { label: 'Platform', href: '#insight-flow' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Experience', href: '#signature' },
] as const;

export const INSIGHT_STAGES = [
  {
    id: 'ingest',
    number: '01',
    title: 'Ingest Data',
    description: 'Connect and stream data from any source. Real-time ingestion pipelines normalize and validate incoming signals.',
    metric: '2.4M',
    metricLabel: 'events / second',
    icon: 'ingest',
  },
  {
    id: 'analyze',
    number: '02',
    title: 'Analyze with AI',
    description: 'Pattern recognition and anomaly detection powered by neural architectures. Contextual analysis across temporal dimensions.',
    metric: '< 50ms',
    metricLabel: 'inference latency',
    icon: 'analyze',
  },
  {
    id: 'insight',
    number: '03',
    title: 'Generate Insight',
    description: 'Structured intelligence surfaces as actionable recommendations. Decision-ready outputs with confidence scoring.',
    metric: '99.7%',
    metricLabel: 'accuracy rate',
    icon: 'insight',
  },
] as const;

export const DASHBOARD_SIDEBAR_ITEMS = [
  { label: 'Overview', icon: 'grid', active: true },
  { label: 'Analytics', icon: 'chart', active: false },
  { label: 'Signals', icon: 'signal', active: false },
  { label: 'Models', icon: 'model', active: false },
  { label: 'Pipelines', icon: 'pipeline', active: false },
  { label: 'Settings', icon: 'settings', active: false },
] as const;

export const DASHBOARD_TABS = ['Overview', 'Signals', 'Models', 'Alerts'] as const;

export const CHART_DATA = {
  throughput: [
    { label: 'Mon', value: 2400 },
    { label: 'Tue', value: 1398 },
    { label: 'Wed', value: 3800 },
    { label: 'Thu', value: 3908 },
    { label: 'Fri', value: 4800 },
    { label: 'Sat', value: 3800 },
    { label: 'Sun', value: 4300 },
  ],
  accuracy: [
    { label: 'W1', value: 96.2 },
    { label: 'W2', value: 97.1 },
    { label: 'W3', value: 97.8 },
    { label: 'W4', value: 98.4 },
    { label: 'W5', value: 99.1 },
    { label: 'W6', value: 99.5 },
    { label: 'W7', value: 99.7 },
  ],
} as const;

export const TABLE_DATA = [
  { id: 'SIG-001', source: 'API Gateway', type: 'Anomaly', confidence: 0.94, status: 'active', timestamp: '2 min ago' },
  { id: 'SIG-002', source: 'User Behavior', type: 'Pattern', confidence: 0.87, status: 'active', timestamp: '5 min ago' },
  { id: 'SIG-003', source: 'Network Flow', type: 'Threshold', confidence: 0.91, status: 'resolved', timestamp: '12 min ago' },
  { id: 'SIG-004', source: 'ML Pipeline', type: 'Drift', confidence: 0.78, status: 'active', timestamp: '18 min ago' },
  { id: 'SIG-005', source: 'Event Stream', type: 'Anomaly', confidence: 0.96, status: 'active', timestamp: '23 min ago' },
  { id: 'SIG-006', source: 'Database', type: 'Pattern', confidence: 0.82, status: 'resolved', timestamp: '31 min ago' },
] as const;

export const STATS = [
  { label: 'Active Signals', value: '1,284', change: '+12.3%', positive: true },
  { label: 'Avg. Latency', value: '47ms', change: '-8.1%', positive: true },
  { label: 'Models Active', value: '24', change: '+3', positive: true },
  { label: 'Accuracy', value: '99.7%', change: '+0.2%', positive: true },
] as const;
