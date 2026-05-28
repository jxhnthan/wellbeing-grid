const departments = [
  // Row 0 — Faculties (top)
  { abbr: "FASS", fullName: "Arts & Social Sciences", row: 0, col: 0, category: "faculty" },
  { abbr: "BIZ", fullName: "Business", row: 0, col: 1, category: "faculty" },
  { abbr: "COM", fullName: "Computing", row: 0, col: 2, category: "faculty" },
  { abbr: "DEN", fullName: "Dentistry", row: 0, col: 3, category: "faculty" },
  { abbr: "SDE", fullName: "Design & Engineering", row: 0, col: 4, category: "faculty" },
  { abbr: "ENG", fullName: "Engineering", row: 0, col: 5, category: "faculty" },
  { abbr: "LAW", fullName: "Law", row: 0, col: 7, category: "faculty" },
  { abbr: "MED", fullName: "Medicine", row: 0, col: 8, category: "faculty" },

  // Row 1 — Faculties + Schools
  { abbr: "NUR", fullName: "Nursing", row: 1, col: 0, category: "faculty" },
  { abbr: "PHA", fullName: "Pharmacy", row: 1, col: 1, category: "faculty" },
  { abbr: "SCI", fullName: "Science", row: 1, col: 2, category: "faculty" },
  { abbr: "MUS", fullName: "Music", row: 1, col: 3, category: "school" },
  { abbr: "SPP", fullName: "Public Policy", row: 1, col: 4, category: "school" },
  { abbr: "ISS", fullName: "Institute of Systems Science", row: 1, col: 5, category: "school" },
  { abbr: "DUK", fullName: "Duke-NUS", row: 1, col: 7, category: "school" },
  { abbr: "USP", fullName: "University Scholars Programme", row: 1, col: 8, category: "school" },

  // Row 2 — STEM departments
  { abbr: "CHM", fullName: "Chemistry", row: 2, col: 0, category: "department" },
  { abbr: "PHY", fullName: "Physics", row: 2, col: 1, category: "department" },
  { abbr: "MTH", fullName: "Mathematics", row: 2, col: 2, category: "department" },
  { abbr: "BIO", fullName: "Biological Sciences", row: 2, col: 3, category: "department" },
  { abbr: "CS", fullName: "Computer Science", row: 2, col: 4, category: "department" },
  { abbr: "ECE", fullName: "Electrical & Computer Engineering", row: 2, col: 5, category: "department" },
  { abbr: "CEE", fullName: "Civil & Environmental Engineering", row: 2, col: 6, category: "department" },
  { abbr: "BME", fullName: "Biomedical Engineering", row: 2, col: 7, category: "department" },
  { abbr: "MSE", fullName: "Materials Science & Engineering", row: 2, col: 8, category: "department" },

  // Row 3 — Humanities & Biz departments
  { abbr: "ECO", fullName: "Economics", row: 3, col: 0, category: "department" },
  { abbr: "PSY", fullName: "Psychology", row: 3, col: 1, category: "department" },
  { abbr: "SOC", fullName: "Sociology", row: 3, col: 2, category: "department" },
  { abbr: "POL", fullName: "Political Science", row: 3, col: 3, category: "department" },
  { abbr: "HIS", fullName: "History", row: 3, col: 4, category: "department" },
  { abbr: "PHI", fullName: "Philosophy", row: 3, col: 5, category: "department" },
  { abbr: "ELL", fullName: "English Language & Literature", row: 3, col: 6, category: "department" },
  { abbr: "ACC", fullName: "Accounting", row: 3, col: 7, category: "department" },
  { abbr: "MKT", fullName: "Marketing", row: 3, col: 8, category: "department" },

  // Row 4 — Research & Centres
  { abbr: "PH", fullName: "Public Health", row: 4, col: 0, category: "research" },
  { abbr: "FST", fullName: "Food Science & Technology", row: 4, col: 1, category: "research" },
  { abbr: "ENV", fullName: "Environmental Sustainability", row: 4, col: 2, category: "research" },
  { abbr: "ENT", fullName: "NUS Enterprise", row: 4, col: 3, category: "research" },
  { abbr: "CLE", fullName: "Continuing & Lifelong Education", row: 4, col: 4, category: "research" },
  { abbr: "R&T", fullName: "Research & Technology", row: 4, col: 5, category: "research" },
  { abbr: "NOC", fullName: "NUS Overseas Colleges", row: 4, col: 7, category: "research" },
  { abbr: "LIB", fullName: "NUS Libraries", row: 4, col: 8, category: "research" },

  // Row 5 — Admin
  { abbr: "FIN", fullName: "Finance", row: 5, col: 0, category: "admin" },
  { abbr: "HR", fullName: "Human Resources", row: 5, col: 1, category: "admin" },
  { abbr: "NIT", fullName: "NUS Information Technology", row: 5, col: 2, category: "admin" },
  { abbr: "REG", fullName: "Registrar's Office", row: 5, col: 3, category: "admin" },
  { abbr: "ADM", fullName: "Admissions", row: 5, col: 4, category: "admin" },
  { abbr: "LEG", fullName: "Legal Affairs", row: 5, col: 5, category: "admin" },
  { abbr: "UCM", fullName: "University Communications", row: 5, col: 6, category: "admin" },
  { abbr: "GR", fullName: "Global Relations", row: 5, col: 7, category: "admin" },
  { abbr: "RMC", fullName: "Risk Management & Compliance", row: 5, col: 8, category: "admin" },

  // Row 6 — Campus & Support
  { abbr: "SA", fullName: "Student Affairs", row: 6, col: 0, category: "support" },
  { abbr: "HWB", fullName: "Health & Wellbeing", row: 6, col: 1, category: "support" },
  { abbr: "HC", fullName: "Health Centre", row: 6, col: 2, category: "support" },
  { abbr: "HSG", fullName: "Housing Services", row: 6, col: 3, category: "support" },
  { abbr: "SPT", fullName: "Sports & UTown", row: 6, col: 4, category: "support" },
  { abbr: "SEC", fullName: "Campus Security", row: 6, col: 5, category: "support" },
  { abbr: "FM", fullName: "Facilities Management", row: 6, col: 7, category: "support" },
  { abbr: "NCA", fullName: "NUS Centre for the Arts", row: 6, col: 8, category: "support" },
];

// Wellbeing + HR metrics per department
const metrics = {};
departments.forEach((d) => {
  const seed = d.abbr.charCodeAt(0) + d.abbr.charCodeAt(d.abbr.length - 1);
  const r = (offset) => Math.round(((Math.sin(seed * offset) + 1) / 2) * 60 + 30);
  const rHR = (offset) => Math.round(((Math.sin(seed * offset) + 1) / 2) * 40 + 10);

  metrics[d.abbr] = {
    satisfaction: r(1.1),
    engagement: r(2.3),
    workload: r(3.7),
    burnout: r(4.1),
    support: r(5.9),
    performanceRating: (((Math.sin(seed * 6.3) + 1) / 2) * 2 + 3).toFixed(1),
    medicalLeaveDays: rHR(7.1),
    salaryBand: ["Band 1", "Band 2", "Band 3", "Band 4"][seed % 4],
    turnoverRate: (((Math.sin(seed * 8.7) + 1) / 2) * 15 + 2).toFixed(1),
    headcount: Math.round(((Math.sin(seed * 9.2) + 1) / 2) * 300 + 50),
  };
});

export { departments, metrics };
