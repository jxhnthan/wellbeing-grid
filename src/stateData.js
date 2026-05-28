// NUS Departments — sorted alphabetically, laid out in a simple row-by-row grid
// No categories — clean, uniform layout

const departmentList = [
  { abbr: 'ACC', fullName: 'Accounting' },
  { abbr: 'ADM', fullName: 'Admissions' },
  { abbr: 'ALM', fullName: 'Alumni Relations' },
  { abbr: 'ANA', fullName: 'Anaesthesia' },
  { abbr: 'A&O', fullName: 'Analytics & Operations' },
  { abbr: 'ANT', fullName: 'Anatomy' },
  { abbr: 'ARC', fullName: 'Architecture' },
  { abbr: 'FASS', fullName: 'Arts & Social Sciences' },
  { abbr: 'BCH', fullName: 'Biochemistry' },
  { abbr: 'BIO', fullName: 'Biological Sciences' },
  { abbr: 'BME', fullName: 'Biomedical Engineering' },
  { abbr: 'BOT', fullName: 'Board of Trustees' },
  { abbr: 'BIZ', fullName: 'Business' },
  { abbr: 'CA', fullName: 'Campus Amenities' },
  { abbr: 'CI', fullName: 'Campus Infrastructure' },
  { abbr: 'SEC', fullName: 'Campus Security' },
  { abbr: 'CPO', fullName: 'Central Procurement' },
  { abbr: 'CBE', fullName: 'Chemical & Biomolecular Eng' },
  { abbr: 'CHM', fullName: 'Chemistry' },
  { abbr: 'CHS', fullName: 'Chinese Studies' },
  { abbr: 'CTP', fullName: 'Chua Thian Poh Centre' },
  { abbr: 'CEE', fullName: 'Civil & Environmental Eng' },
  { abbr: 'CNM', fullName: 'Communications & New Media' },
  { abbr: 'CS', fullName: 'Computer Science' },
  { abbr: 'COM', fullName: 'Computing' },
  { abbr: 'CEM', fullName: 'Conferences & Events' },
  { abbr: 'CLE', fullName: 'Continuing & Lifelong Ed' },
  { abbr: 'DEN', fullName: 'Dentistry' },
  { abbr: 'SDE', fullName: 'Design & Engineering' },
  { abbr: 'CTL', fullName: 'Centre for Teaching & Learning' },
  { abbr: 'DEV', fullName: 'Development Office' },
  { abbr: 'RAD', fullName: 'Diagnostic Radiology' },
  { abbr: 'DUK', fullName: 'Duke-NUS' },
  { abbr: 'ECO', fullName: 'Economics' },
  { abbr: 'ECE', fullName: 'Electrical & Computer Eng' },
  { abbr: 'ETM', fullName: 'Eng & Technology Mgmt' },
  { abbr: 'ELC', fullName: 'English Language Comm' },
  { abbr: 'ELL', fullName: 'English Language & Lit' },
  { abbr: 'ENT', fullName: 'Enterprise' },
  { abbr: 'ENV', fullName: 'Environmental Sustainability' },
  { abbr: 'EST', fullName: 'Estate Development' },
  { abbr: 'FM', fullName: 'Facilities Management' },
  { abbr: 'FIN', fullName: 'Finance' },
  { abbr: 'FIO', fullName: 'Finance Office' },
  { abbr: 'FST', fullName: 'Food Science & Technology' },
  { abbr: 'FRG', fullName: 'Future-Ready Graduates' },
  { abbr: 'GEO', fullName: 'Geography' },
  { abbr: 'GR', fullName: 'Global Relations' },
  { abbr: 'HC', fullName: 'Health Centre' },
  { abbr: 'HWB', fullName: 'Health & Wellbeing' },
  { abbr: 'HIS', fullName: 'History' },
  { abbr: 'HSG', fullName: 'Housing Services' },
  { abbr: 'HR', fullName: 'Human Resources' },
  { abbr: 'ISE', fullName: 'Industrial Systems Eng' },
  { abbr: 'IND', fullName: 'Industrial Design' },
  { abbr: 'ILO', fullName: 'Industry Liaison' },
  { abbr: 'ISA', fullName: 'Info Systems & Analytics' },
  { abbr: 'ISS', fullName: 'Institute of Systems Science' },
  { abbr: 'IT', fullName: 'Instructional Technology' },
  { abbr: 'AUD', fullName: 'Internal Audit' },
  { abbr: 'INV', fullName: 'Investment Office' },
  { abbr: 'JPN', fullName: 'Japanese Studies' },
  { abbr: 'LNG', fullName: 'Language Studies' },
  { abbr: 'LAW', fullName: 'Law' },
  { abbr: 'LEG', fullName: 'Legal Affairs' },
  { abbr: 'MLY', fullName: 'Malay Studies' },
  { abbr: 'M&O', fullName: 'Management & Organisation' },
  { abbr: 'MKT', fullName: 'Marketing' },
  { abbr: 'MSE', fullName: 'Materials Science & Eng' },
  { abbr: 'MTH', fullName: 'Mathematics' },
  { abbr: 'MCE', fullName: 'Mechanical Engineering' },
  { abbr: 'MED', fullName: 'Medicine' },
  { abbr: 'MIC', fullName: 'Microbiology' },
  { abbr: 'MUS', fullName: 'Music' },
  { abbr: 'NHM', fullName: 'Natural History Museum' },
  { abbr: 'NUR', fullName: 'Nursing Studies' },
  { abbr: 'NCA', fullName: 'NUS Centre for the Arts' },
  { abbr: 'NEC', fullName: 'NUS Entrepreneurship Centre' },
  { abbr: 'NIT', fullName: 'NUS Information Technology' },
  { abbr: 'LIB', fullName: 'NUS Libraries' },
  { abbr: 'NMU', fullName: 'NUS Museum' },
  { abbr: 'NOC', fullName: 'NUS Overseas Colleges' },
  { abbr: 'NPR', fullName: 'NUS Press' },
  { abbr: 'OBG', fullName: 'Obstetrics & Gynaecology' },
  { abbr: 'OPH', fullName: 'Ophthalmology' },
  { abbr: 'OEX', fullName: 'Organisational Excellence' },
  { abbr: 'ORT', fullName: 'Orthopaedic Surgery' },
  { abbr: 'ENT2', fullName: 'Otolaryngology' },
  { abbr: 'PED', fullName: 'Paediatrics' },
  { abbr: 'PTH', fullName: 'Pathology' },
  { abbr: 'PCL', fullName: 'Pharmacology' },
  { abbr: 'PHA', fullName: 'Pharmacy' },
  { abbr: 'PHI', fullName: 'Philosophy' },
  { abbr: 'PHY', fullName: 'Physics' },
  { abbr: 'PSL', fullName: 'Physiology' },
  { abbr: 'POL', fullName: 'Political Science' },
  { abbr: 'PRE', fullName: 'President' },
  { abbr: 'PRV', fullName: 'Provost' },
  { abbr: 'PSM', fullName: 'Psychological Medicine' },
  { abbr: 'PSY', fullName: 'Psychology' },
  { abbr: 'PH', fullName: 'Public Health' },
  { abbr: 'SPP', fullName: 'Public Policy' },
  { abbr: 'RE', fullName: 'Real Estate' },
  { abbr: 'REG', fullName: 'Registrar' },
  { abbr: 'R&T', fullName: 'Research & Technology' },
  { abbr: 'RMC', fullName: 'Risk Management & Compliance' },
  { abbr: 'SCI', fullName: 'Science' },
  { abbr: 'SW', fullName: 'Social Work' },
  { abbr: 'SOC', fullName: 'Sociology' },
  { abbr: 'SAS', fullName: 'South Asian Studies' },
  { abbr: 'SEA', fullName: 'Southeast Asian Studies' },
  { abbr: 'SPT', fullName: 'Sports & UTown Mgmt' },
  { abbr: 'STA', fullName: 'Statistics & Applied Prob' },
  { abbr: 'S&P', fullName: 'Strategy & Policy' },
  { abbr: 'SA', fullName: 'Student Affairs' },
  { abbr: 'SUR', fullName: 'Surgery' },
  { abbr: 'UCO', fullName: 'University Communications' },
  { abbr: 'USP', fullName: 'University Scholars Programme' },
  { abbr: 'UTM', fullName: 'University Town Management' },
];

// Grid config: how many columns
const GRID_COLS = 10;

// Auto-assign row/col based on alphabetical index
const departments = departmentList.map((dept, i) => ({
  ...dept,
  row: Math.floor(i / GRID_COLS),
  col: i % GRID_COLS,
}));

// Generate sample wellbeing + HR metrics for each department
const metrics = {};
const hrData = {};

// Seed-based pseudo-random for consistent values
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

departments.forEach((dept, i) => {
  const r = (offset) => Math.round(seededRandom(i * 7 + offset) * 40 + 40);
  const hr = (offset) => Math.round(seededRandom(i * 13 + offset) * 30 + 50);

  metrics[dept.abbr] = {
    satisfaction: r(1),
    engagement: r(2),
    workload: r(3),
    burnout: r(4),
    support: r(5),
  };

  hrData[dept.abbr] = {
    performance: (seededRandom(i * 11 + 1) * 1.5 + 3.5).toFixed(1),
    medicalLeave: Math.round(seededRandom(i * 11 + 2) * 8 + 2),
    salaryBand: ['Band 1', 'Band 2', 'Band 3', 'Band 4'][Math.floor(seededRandom(i * 11 + 3) * 4)],
    turnover: (seededRandom(i * 11 + 4) * 12 + 2).toFixed(1),
    headcount: Math.round(seededRandom(i * 11 + 5) * 180 + 20),
  };
});

export { departments, metrics, hrData, GRID_COLS };
