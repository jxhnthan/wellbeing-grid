// Department data for NUS Wellbeing Grid
// Each department has: abbr, fullName, row, col, category, metrics

export const categories = {
  faculty: { label: 'Faculties', color: '#003D7C' },
  school: { label: 'Schools & Programmes', color: '#1a5276' },
  stem: { label: 'STEM Departments', color: '#2e6f8e' },
  humanities: { label: 'Humanities & Business', color: '#4a8fa8' },
  research: { label: 'Research & Outreach', color: '#7ab5c4' },
  admin: { label: 'Administration', color: '#a0c4cf' },
  campus: { label: 'Campus & Student Life', color: '#c2d9e1' },
};

export const departments = [
  // Row 0 — Faculties (top tier)
  { abbr: 'FASS', fullName: 'Arts & Social Sciences', row: 0, col: 0, category: 'faculty' },
  { abbr: 'BIZ', fullName: 'Business', row: 0, col: 1, category: 'faculty' },
  { abbr: 'COM', fullName: 'Computing', row: 0, col: 2, category: 'faculty' },
  { abbr: 'DEN', fullName: 'Dentistry', row: 0, col: 3, category: 'faculty' },
  { abbr: 'SDE', fullName: 'Design & Engineering', row: 0, col: 4, category: 'faculty' },
  { abbr: 'ENG', fullName: 'Engineering', row: 0, col: 5, category: 'faculty' },
  { abbr: 'LAW', fullName: 'Law', row: 0, col: 7, category: 'faculty' },
  { abbr: 'MED', fullName: 'Medicine', row: 0, col: 8, category: 'faculty' },

  // Row 1 — Schools & Programmes
  { abbr: 'NUR', fullName: 'Nursing', row: 1, col: 0, category: 'school' },
  { abbr: 'PHA', fullName: 'Pharmacy', row: 1, col: 1, category: 'school' },
  { abbr: 'SCI', fullName: 'Science', row: 1, col: 2, category: 'school' },
  { abbr: 'MUS', fullName: 'Music', row: 1, col: 3, category: 'school' },
  { abbr: 'SPP', fullName: 'Public Policy', row: 1, col: 4, category: 'school' },
  { abbr: 'ISS', fullName: 'Systems Science', row: 1, col: 5, category: 'school' },
  { abbr: 'DUK', fullName: 'Duke-NUS', row: 1, col: 7, category: 'school' },
  { abbr: 'USP', fullName: 'University Scholars', row: 1, col: 8, category: 'school' },

  // Row 2 — STEM Departments
  { abbr: 'CHM', fullName: 'Chemistry', row: 2, col: 0, category: 'stem' },
  { abbr: 'PHY', fullName: 'Physics', row: 2, col: 1, category: 'stem' },
  { abbr: 'MTH', fullName: 'Mathematics', row: 2, col: 2, category: 'stem' },
  { abbr: 'BIO', fullName: 'Biological Sciences', row: 2, col: 3, category: 'stem' },
  { abbr: 'CS', fullName: 'Computer Science', row: 2, col: 4, category: 'stem' },
  { abbr: 'ECE', fullName: 'Electrical & Computer Eng', row: 2, col: 5, category: 'stem' },
  { abbr: 'CEE', fullName: 'Civil & Environmental Eng', row: 2, col: 6, category: 'stem' },
  { abbr: 'BME', fullName: 'Biomedical Engineering', row: 2, col: 7, category: 'stem' },
  { abbr: 'MSE', fullName: 'Materials Science & Eng', row: 2, col: 8, category: 'stem' },

  // Row 3 — Humanities & Business Departments
  { abbr: 'ECO', fullName: 'Economics', row: 3, col: 0, category: 'humanities' },
  { abbr: 'PSY', fullName: 'Psychology', row: 3, col: 1, category: 'humanities' },
  { abbr: 'SOC', fullName: 'Sociology', row: 3, col: 2, category: 'humanities' },
  { abbr: 'POL', fullName: 'Political Science', row: 3, col: 3, category: 'humanities' },
  { abbr: 'HIS', fullName: 'History', row: 3, col: 4, category: 'humanities' },
  { abbr: 'PHI', fullName: 'Philosophy', row: 3, col: 5, category: 'humanities' },
  { abbr: 'ELL', fullName: 'English Language & Lit', row: 3, col: 6, category: 'humanities' },
  { abbr: 'ACC', fullName: 'Accounting', row: 3, col: 7, category: 'humanities' },
  { abbr: 'MKT', fullName: 'Marketing', row: 3, col: 8, category: 'humanities' },

  // Row 4 — Research & Outreach
  { abbr: 'PH', fullName: 'Public Health', row: 4, col: 0, category: 'research' },
  { abbr: 'FST', fullName: 'Food Science & Tech', row: 4, col: 1, category: 'research' },
  { abbr: 'ENV', fullName: 'Environmental Sustainability', row: 4, col: 2, category: 'research' },
  { abbr: 'ENT', fullName: 'Enterprise', row: 4, col: 3, category: 'research' },
  { abbr: 'CLE', fullName: 'Continuing Education', row: 4, col: 4, category: 'research' },
  { abbr: 'R&T', fullName: 'Research & Technology', row: 4, col: 5, category: 'research' },
  { abbr: 'NOC', fullName: 'Overseas Colleges', row: 4, col: 7, category: 'research' },
  { abbr: 'LIB', fullName: 'NUS Libraries', row: 4, col: 8, category: 'research' },

  // Row 5 — Administration
  { abbr: 'FIN', fullName: 'Finance', row: 5, col: 0, category: 'admin' },
  { abbr: 'HR', fullName: 'Human Resources', row: 5, col: 1, category: 'admin' },
  { abbr: 'NIT', fullName: 'Information Technology', row: 5, col: 2, category: 'admin' },
  { abbr: 'REG', fullName: 'Registrar', row: 5, col: 3, category: 'admin' },
  { abbr: 'ADM', fullName: 'Admissions', row: 5, col: 4, category: 'admin' },
  { abbr: 'LEG', fullName: 'Legal Affairs', row: 5, col: 5, category: 'admin' },
  { abbr: 'UCM', fullName: 'University Comms', row: 5, col: 6, category: 'admin' },
  { abbr: 'GR', fullName: 'Global Relations', row: 5, col: 7, category: 'admin' },
  { abbr: 'RMC', fullName: 'Risk & Compliance', row: 5, col: 8, category: 'admin' },

  // Row 6 — Campus & Student Life
  { abbr: 'SA', fullName: 'Student Affairs', row: 6, col: 0, category: 'campus' },
  { abbr: 'HWB', fullName: 'Health & Wellbeing', row: 6, col: 1, category: 'campus' },
  { abbr: 'HC', fullName: 'Health Centre', row: 6, col: 2, category: 'campus' },
  { abbr: 'HSG', fullName: 'Housing Services', row: 6, col: 3, category: 'campus' },
  { abbr: 'SPT', fullName: 'Sports & UTown', row: 6, col: 4, category: 'campus' },
  { abbr: 'SEC', fullName: 'Campus Security', row: 6, col: 5, category: 'campus' },
  { abbr: 'FM', fullName: 'Facilities Management', row: 6, col: 7, category: 'campus' },
  { abbr: 'NCA', fullName: 'Centre for the Arts', row: 6, col: 8, category: 'campus' },
];

// Wellbeing metrics per department
const seed = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const gen = (abbr, min, max) => {
  const s = seed(abbr);
  return min + (s % (max - min + 1));
};

export const metrics = {};
departments.forEach((d) => {
  metrics[d.abbr] = {
    satisfaction: gen(d.abbr + 'sat', 38, 92),
    engagement: gen(d.abbr + 'eng', 35, 90),
    workload: gen(d.abbr + 'wl', 30, 85),
    burnout: gen(d.abbr + 'bo', 15, 70),
    support: gen(d.abbr + 'sp', 40, 95),
  };
});

// HR metrics per department
export const hrMetrics = {};
departments.forEach((d) => {
  hrMetrics[d.abbr] = {
    performanceRating: (3.0 + (gen(d.abbr + 'pr', 0, 20) / 10)).toFixed(1),
    medicalLeave: gen(d.abbr + 'ml', 3, 18),
    salaryBand: ['Band 1', 'Band 2', 'Band 3', 'Band 4'][gen(d.abbr + 'sb', 0, 3)],
    turnoverRate: (gen(d.abbr + 'tr', 20, 140) / 10).toFixed(1),
    headcount: gen(d.abbr + 'hc', 25, 400),
  };
});
