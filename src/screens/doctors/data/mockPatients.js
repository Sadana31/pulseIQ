export const mockPatients = [
    {
        id: 'P-10042',
        name: 'Eleanor Vance',
        age: 72,
        gender: 'Female',
        priority: 'Critical',
        condition: 'Acute Heart Failure',
        room: 'ICU-04',
        vitals: {
            hr: '115 bpm (↑)',
            bp: '85/55 mmHg (↓)',
            o2: '89% (↓)',
        },
        warnings: [
            { id: 'w1', type: 'danger', title: 'Severe Hypotension', desc: 'Patient BP dropping rapidly. Immediate intervention required.' },
            { id: 'w2', type: 'warning', title: 'Medication Interaction Risk', desc: 'Current order for Furosemide conflicts with recent ACE inhibitor admin.' }
        ],
        recommendations: [
            'Titrate Dobutamine drip per ICU protocol.',
            'Schedule stat portable Echocardiogram.',
            'Hold Furosemide until renal panel returns.'
        ]
    },
    {
        id: 'P-10089',
        name: 'Marcus Thorne',
        age: 58,
        gender: 'Male',
        priority: 'High',
        condition: 'Post-op Sepsis Risk',
        room: 'Ward A-12',
        vitals: {
            hr: '98 bpm',
            bp: '105/70 mmHg',
            o2: '94%',
        },
        warnings: [
            { id: 'w3', type: 'warning', title: 'Elevated WBC Trend', desc: 'White blood count has increased by 40% over last 12 hours.' },
            { id: 'w4', type: 'warning', title: 'Fever Spike', desc: 'Temperature at 38.9°C.' }
        ],
        recommendations: [
            'Draw blood cultures X2.',
            'Initiate broad-spectrum IV antibiotics immediately.'
        ]
    },
    {
        id: 'P-10112',
        name: 'Sarah Jenkins',
        age: 34,
        gender: 'Female',
        priority: 'Moderate',
        condition: 'Asthma Exacerbation',
        room: 'ER-Bed 3',
        vitals: {
            hr: '102 bpm',
            bp: '120/80 mmHg',
            o2: '92%',
        },
        warnings: [
            { id: 'w5', type: 'warning', title: 'Poor Response to Albuterol', desc: 'Peak flow remains under 50% predicted after 3 treatments.' }
        ],
        recommendations: [
            'Administer IV Corticosteroids.',
            'Consider continuous nebulization.'
        ]
    },
];
