export const departments = [
  // Row 0 — Faculties
  { abbr: 'FASS', fullName: 'Arts & Social Sciences', row: 0, col: 0, category: 'faculty' },
  { abbr: 'BIZ', fullName: 'Business', row: 0, col: 1, category: 'faculty' },
  { abbr: 'COM', fullName: 'Computing', row: 0, col: 2, category: 'faculty' },
  { abbr: 'DEN', fullName: 'Dentistry', row: 0, col: 3, category: 'faculty' },
  { abbr: 'SDE', fullName: 'Design & Engineering', row: 0, col: 4, category: 'faculty' },
  { abbr: 'ENG', fullName: 'Engineering', row: 0, col: 5, category: 'faculty' },
  { abbr: 'LAW', fullName: 'Law', row: 0, col: 7, category: 'faculty' },
  { abbr: 'MED', fullName: 'Medicine', row: 0, col: 8, category: 'faculty' },

  // Row 1 — Schools & Institutes
  { abbr: 'NUR', fullName: 'Nursing', row: 1, col: 0, category: 'school' },
  { abbr: 'PHA', fullName: 'Pharmacy', row: 1, col: 1, category: 'school' },
  { abbr: 'SCI', fullName: 'Science', row: 1, col: 2, category: 'school' },
  { abbr: 'MUS', fullName: 'Music', row: 1, col: 3, category: 'school' },
  { abbr: 'SPP', fullName: 'Public Policy', row: 1, col: 4, category: 'school' },
  { abbr: 'ISS', fullName: 'Institute of Systems Science', row: 1, col: 5, category: 'school' },
  { abbr: 'DUK', fullName: 'Duke-NUS', row: 1, col: 7, category: 'school' },
  { abbr: 'USP', fullName: 'University Scholars Programme', row: 1, col: 8, category: 'school' },

  // Row 2 — STEM Departments
  { abbr: 'CHM', fullName: 'Chemistry', row: 2, col: 0, category: 'stem' },
  { abbr: 'PHY', fullName: 'Physics', row: 2, col: 1, category: 'stem' },
  { abbr: 'MTH', fullName: 'Mathematics', row: 2, col: 2, category: 'stem' },
  { abbr: 'BIO', fullName: 'Biological Sciences', row: 2, col: 3, category: 'stem' },
  { abbr: 'CS', fullName: 'Computer Science', row: 2, col: 4, category: 'stem' },
  { abbr: 'ECE', fullName: 'Electrical & Computer Engineering', row: 2, col: 5, category: 'stem' },
  { abbr: 'CEE', fullName: 'Civil & Environmental Engineering', row: 2, col: 6, category: 'stem' },
  { abbr: 'BME', fullName: 'Biomedical Engineering', row: 2, col: 7, category: 'stem' },
  { abbr: 'MSE', fullName: 'Materials Science & Engineering', row: 2, col: 8, category: 'stem' },

  // Row 3 — Humanities & Business Departments
  { abbr: 'ECO', fullName: 'Economics', row: 3, col: 0, category: 'humanities' },
  { abbr: 'PSY', fullName: 'Psychology', row: 3, col: 1, category: 'humanities' },
  { abbr: 'SOC', fullName: 'Sociology', row: 3, col: 2, category: 'humanities' },
  { abbr: 'POL', fullName: 'Political Science', row: 3, col: 3, category: 'humanities' },
  { abbr: 'HIS', fullName: 'History', row: 3, col: 4, category: 'humanities' },
  { abbr: 'PHI', fullName: 'Philosophy', row: 3, col: 5, category: 'humanities' },
  { abbr: 'ELL', fullName: 'English Language & Literature', row: 3, col: 6, category: 'humanities' },
  { abbr: 'ACC', fullName: 'Accounting', row: 3, col: 7, category: 'humanities' },
  { abbr: 'MKT', fullName: 'Marketing', row: 3, col: 8, category: 'humanities' },

  // Row 4 — Research & Programmes
  { abbr: 'PH', fullName: 'Public Health', row: 4, col: 0, category: 'research' },
  { abbr: 'FST', fullName: 'Food Science & Technology', row: 4, col: 1, category: 'research' },
  { abbr: 'ENV', fullName: 'Environmental Sustainability', row: 4, col: 2, category: 'research' },
  { abbr: 'ENT', fullName: 'Enterprise', row: 4, col: 3, category: 'research' },
  { abbr: 'CLE', fullName: 'Continuing & Lifelong Education', row: 4, col: 4, category: 'research' },
  { abbr: 'R&T', fullName: 'Research & Technology', row: 4, col: 5, category: 'research' },
  { abbr: 'NOC', fullName: 'NUS Overseas Colleges', row: 4, col: 7, category: 'research' },
  { abbr: 'LIB', fullName: 'NUS Libraries', row: 4, col: 8, category: 'research' },

  // Row 5 — Administration
  { abbr: 'FIN', fullName: 'Finance', row: 5, col: 0, category: 'admin' },
  { abbr: 'HR', fullName: 'Human Resources', row: 5, col: 1, category: 'admin' },
  { abbr: 'NIT', fullName: 'NUS Information Technology', row: 5, col: 2, category: 'admin' },
  { abbr: 'REG', fullName: 'Registrar', row: 5, col: 3, category: 'admin' },
  { abbr: 'ADM', fullName: 'Admissions', row: 5, col: 4, category: 'admin' },
  { abbr: 'LEG', fullName: 'Legal Affairs', row: 5, col: 5, category: 'admin' },
  { abbr: 'UCM', fullName: 'University Communications', row: 5, col: 6, category: 'admin' },
  { abbr: 'GR', fullName: 'Global Relations', row: 5, col: 7, category: 'admin' },
  { abbr: 'RMC', fullName: 'Risk Management & Compliance', row: 5, col: 8, category: 'admin' },

  // Row 6 — Campus Life & Support
  { abbr: 'SA', fullName: 'Student Affairs', row: 6, col: 0, category: 'campus' },
  { abbr: 'HWB', fullName: 'Health & Wellbeing', row: 6, col: 1, category: 'campus' },
  { abbr: 'HC', fullName: 'Health Centre', row: 6, col: 2, category: 'campus' },
  { abbr: 'HSG', fullName: 'Housing Services', row: 6, col: 3, category: 'campus' },
  { abbr: 'SPT', fullName: 'Sports & UTown Management', row: 6, col: 4, category: 'campus' },
  { abbr: 'SEC', fullName: 'Campus Security', row: 6, col: 5, category: 'campus' },
  { abbr: 'FM', fullName: 'Facilities Management', row: 6, col: 7, category: 'campus' },
  { abbr: 'NCA', fullName: 'NUS Centre for the Arts', row: 6, col: 8, category: 'campus' },
];

// Wellbeing metrics (simulated data)
export const metrics = {};
departments.forEach((d) => {
  const seed = d.abbr.charCodeAt(0) + d.abbr.charCodeAt(1);
  metrics[d.abbr] = {
    satisfaction: 35 + (seed * 7) % 55,
    workload: 25 + (seed * 11) % 50,
    engagement: 40 + (seed * 5) % 50,
    burnout: 15 + (seed * 13) % 55,
    support: 40 + (seed * 3) % 50,
  };
});

// HR data (simulated)
export const hrData = {};
departments.forEach((d) => {
  const seed = d.abbr.charCodeAt(0) + d.abbr.charCodeAt(1);
  hrData[d.abbr] = {
    headcount: 40 + (seed * 7) % 260,
    performanceRating: (3.0 + ((seed * 3) % 20) / 10).toFixed(1),
    medicalLeaveDays: (2 + (seed * 11) % 10).toFixed(1),
    salaryBand: ['A', 'B', 'C', 'D'][(seed * 3) % 4],
    turnoverRate: (2 + ((seed * 7) % 120) / 10).toFixed(1),
    rank: ['Junior', 'Mid-level', 'Senior', 'Leadership'][(seed * 5) % 4],
  };
});
