// NUS Department grid positions, categories, and wellbeing metrics
// Grid: 9 columns x 7 rows, grouped by organisational category

export const categories = {
  faculty:  { label: 'Faculties',        color: '#003D7C' },
  school:   { label: 'Schools',          color: '#1a5a9e' },
  stem:     { label: 'STEM Departments', color: '#3572b0' },
  arts:     { label: 'Humanities & Biz', color: '#6898c7' },
  research: { label: 'Research & CLE',   color: '#9cb8d9' },
  admin:    { label: 'Administration',   color: '#c5d5e8' },
};

export const departments = [
  // Row 0 — Faculties
  { abbr: 'FASS', fullName: 'Arts & Social Sciences',  row: 0, col: 0, category: 'faculty' },
  { abbr: 'BIZ',  fullName: 'Business',                row: 0, col: 1, category: 'faculty' },
  { abbr: 'COM',  fullName: 'Computing',                row: 0, col: 2, category: 'faculty' },
  { abbr: 'DEN',  fullName: 'Dentistry',                row: 0, col: 3, category: 'faculty' },
  { abbr: 'SDE',  fullName: 'Design & Engineering',     row: 0, col: 4, category: 'faculty' },
  { abbr: 'ENG',  fullName: 'Engineering',               row: 0, col: 5, category: 'faculty' },
  { abbr: 'LAW',  fullName: 'Law',                       row: 0, col: 7, category: 'faculty' },
  { abbr: 'MED',  fullName: 'Medicine',                  row: 0, col: 8, category: 'faculty' },

  // Row 1 — Faculties + Schools
  { abbr: 'NUR',  fullName: 'Nursing',                   row: 1, col: 0, category: 'faculty' },
  { abbr: 'PHA',  fullName: 'Pharmacy',                  row: 1, col: 1, category: 'faculty' },
  { abbr: 'SCI',  fullName: 'Science',                   row: 1, col: 2, category: 'faculty' },
  { abbr: 'MUS',  fullName: 'Music',                     row: 1, col: 3, category: 'faculty' },
  { abbr: 'SPP',  fullName: 'Public Policy',             row: 1, col: 4, category: 'school' },
  { abbr: 'ISS',  fullName: 'Institute of Systems Sci',  row: 1, col: 5, category: 'school' },
  { abbr: 'DUK',  fullName: 'Duke-NUS',                  row: 1, col: 7, category: 'school' },
  { abbr: 'USP',  fullName: 'University Scholars',       row: 1, col: 8, category: 'school' },

  // Row 2 — STEM Departments
  { abbr: 'CHM',  fullName: 'Chemistry',                 row: 2, col: 0, category: 'stem' },
  { abbr: 'PHY',  fullName: 'Physics',                   row: 2, col: 1, category: 'stem' },
  { abbr: 'MTH',  fullName: 'Mathematics',               row: 2, col: 2, category: 'stem' },
  { abbr: 'BIO',  fullName: 'Biological Sciences',       row: 2, col: 3, category: 'stem' },
  { abbr: 'CS',   fullName: 'Computer Science',          row: 2, col: 4, category: 'stem' },
  { abbr: 'ECE',  fullName: 'Electrical & Computer Eng', row: 2, col: 5, category: 'stem' },
  { abbr: 'CEE',  fullName: 'Civil & Environmental Eng', row: 2, col: 6, category: 'stem' },
  { abbr: 'BME',  fullName: 'Biomedical Engineering',    row: 2, col: 7, category: 'stem' },
  { abbr: 'MSE',  fullName: 'Materials Science & Eng',   row: 2, col: 8, category: 'stem' },

  // Row 3 — Humanities & Business depts
  { abbr: 'ECO',  fullName: 'Economics',                  row: 3, col: 0, category: 'arts' },
  { abbr: 'PSY',  fullName: 'Psychology',                 row: 3, col: 1, category: 'arts' },
  { abbr: 'SOC',  fullName: 'Sociology',                  row: 3, col: 2, category: 'arts' },
  { abbr: 'POL',  fullName: 'Political Science',          row: 3, col: 3, category: 'arts' },
  { abbr: 'HIS',  fullName: 'History',                    row: 3, col: 4, category: 'arts' },
  { abbr: 'PHI',  fullName: 'Philosophy',                 row: 3, col: 5, category: 'arts' },
  { abbr: 'ELL',  fullName: 'English Language & Lit',     row: 3, col: 6, category: 'arts' },
  { abbr: 'ACC',  fullName: 'Accounting',                 row: 3, col: 7, category: 'arts' },
  { abbr: 'MKT',  fullName: 'Marketing',                  row: 3, col: 8, category: 'arts' },

  // Row 4 — Research & CLE
  { abbr: 'PH',   fullName: 'Public Health',              row: 4, col: 0, category: 'research' },
  { abbr: 'FST',  fullName: 'Food Science & Tech',        row: 4, col: 1, category: 'research' },
  { abbr: 'ENV',  fullName: 'Environmental Sustainability', row: 4, col: 2, category: 'research' },
  { abbr: 'ENT',  fullName: 'Enterprise',                 row: 4, col: 3, category: 'research' },
  { abbr: 'CLE',  fullName: 'Continuing & Lifelong Ed',   row: 4, col: 4, category: 'research' },
  { abbr: 'R&T',  fullName: 'Research & Technology',       row: 4, col: 5, category: 'research' },
  { abbr: 'NOC',  fullName: 'NUS Overseas Colleges',       row: 4, col: 7, category: 'research' },
  { abbr: 'LIB',  fullName: 'NUS Libraries',              row: 4, col: 8, category: 'research' },

  // Row 5 — Administration
  { abbr: 'FIN',  fullName: 'Finance',                    row: 5, col: 0, category: 'admin' },
  { abbr: 'HR',   fullName: 'Human Resources',            row: 5, col: 1, category: 'admin' },
  { abbr: 'NIT',  fullName: 'NUS Information Technology',  row: 5, col: 2, category: 'admin' },
  { abbr: 'REG',  fullName: 'Registrar',                  row: 5, col: 3, category: 'admin' },
  { abbr: 'ADM',  fullName: 'Admissions',                 row: 5, col: 4, category: 'admin' },
  { abbr: 'LEG',  fullName: 'Legal Affairs',              row: 5, col: 5, category: 'admin' },
  { abbr: 'UCO',  fullName: 'University Communications',  row: 5, col: 6, category: 'admin' },
  { abbr: 'GR',   fullName: 'Global Relations',           row: 5, col: 7, category: 'admin' },
  { abbr: 'RMC',  fullName: 'Risk Mgmt & Compliance',     row: 5, col: 8, category: 'admin' },

  // Row 6 — Campus & Student Life
  { abbr: 'SA',   fullName: 'Student Affairs',            row: 6, col: 0, category: 'admin' },
  { abbr: 'HWB',  fullName: 'Health & Wellbeing',         row: 6, col: 1, category: 'admin' },
  { abbr: 'HC',   fullName: 'Health Centre',              row: 6, col: 2, category: 'admin' },
  { abbr: 'HSG',  fullName: 'Housing Services',           row: 6, col: 3, category: 'admin' },
  { abbr: 'SPT',  fullName: 'Sports & UTown Mgmt',        row: 6, col: 4, category: 'admin' },
  { abbr: 'SEC',  fullName: 'Campus Security',            row: 6, col: 5, category: 'admin' },
  { abbr: 'FM',   fullName: 'Facilities Management',      row: 6, col: 7, category: 'admin' },
  { abbr: 'NCA',  fullName: 'NUS Centre for the Arts',    row: 6, col: 8, category: 'admin' },
];

// Wellbeing metrics per department
export const metrics = {};
departments.forEach((d) => {
  const seed = d.abbr.charCodeAt(0) + d.abbr.charCodeAt(d.abbr.length - 1);
  const rand = (min, max, offset) => min + ((seed * (offset + 7)) % (max - min));

  metrics[d.abbr] = {
    satisfaction: rand(38, 92, 1),
    workload:     rand(30, 85, 2),
    engagement:   rand(40, 90, 3),
    burnout:      rand(20, 75, 4),
    support:      rand(45, 95, 5),
  };
});

// HR data per department
export const hrData = {};
departments.forEach((d) => {
  const seed = d.abbr.charCodeAt(0) * 3 + d.abbr.charCodeAt(d.abbr.length - 1) * 7;
  const rand = (min, max, offset) => min + ((seed * (offset + 3)) % (max - min));

  hrData[d.abbr] = {
    headcount:      rand(30, 400, 1),
    performanceAvg: (3.0 + ((seed * 13) % 20) / 10).toFixed(1),
    medicalLeave:   rand(2, 14, 3),
    salaryBand:     ['Band 1-3', 'Band 3-5', 'Band 5-7', 'Band 7-9'][seed % 4],
    turnoverPct:    (2 + ((seed * 11) % 140) / 10).toFixed(1),
  };
});
