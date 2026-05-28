// All NUS departments — alphabetical order, with wellbeing + HR metrics
// Each department gets a random-seeded but consistent set of metrics for the PoC

const departmentList = [
  "Accounting", "Admissions", "Alumni Relations", "Anaesthesia",
  "Analytics and Operations", "Anatomy", "Architecture",
  "Arts & Social Sciences", "Biochemistry", "Biological Sciences",
  "Biomedical Engineering", "Board of Trustees Secretariat", "Business",
  "Campus Amenities", "Campus Infrastructure", "Campus Security",
  "Central Procurement Office", "Chemical & Biomolecular Engineering",
  "Chemistry", "Chinese Studies",
  "Chua Thian Poh Community Leadership Centre",
  "Civil & Environmental Engineering", "Communications & New Media",
  "Computer Science", "Computing",
  "Conferences and Events Management Unit",
  "Continuing and Lifelong Education", "Dentistry",
  "Design and Engineering",
  "Centre for Teaching, Learning and Technology",
  "Development Office", "Diagnostic Radiology", "Duke-NUS",
  "Economics", "Electrical & Computer Engineering",
  "Engineering & Technology Management",
  "English Language Communication",
  "English Language & Literature", "Enterprise",
  "Environmental Sustainability", "Estate Development",
  "Facilities Management", "Finance", "Finance Office",
  "Food Science and Technology", "Future-Ready Graduates",
  "Geography", "Global Relations",
  "Health Centre", "Health & Wellbeing", "History",
  "Housing Services", "Human Resources",
  "Industrial Systems Engineering and Management",
  "Industrial Design", "Industry Liaison",
  "Information Systems & Analytics", "Institute of Systems Science",
  "Instructional Technology", "Internal Audit",
  "Investment Office", "Japanese Studies",
  "Language Studies", "Law", "Legal Affairs",
  "Malay Studies", "Management & Organisation", "Marketing",
  "Materials Science & Engineering", "Mathematics",
  "Mechanical Engineering", "Medicine", "Microbiology", "Music",
  "Natural History Museum", "Nursing Studies",
  "NUS Centre For the Arts", "NUS Entrepreneurship Centre",
  "NUS Information Technology", "NUS Libraries", "NUS Museum",
  "NUS Overseas Colleges", "NUS Press",
  "Obstetrics & Gynaecology", "Ophthalmology",
  "Organisational Excellence", "Orthopaedic Surgery",
  "Otolaryngology",
  "Paediatrics", "Pathology", "Pharmacology", "Pharmacy",
  "Philosophy", "Physics", "Physiology", "Political Science",
  "President", "Provost", "Psychological Medicine", "Psychology",
  "Public Health", "Public Policy",
  "Real Estate", "Registrar", "Research & Technology",
  "Risk Management and Compliance",
  "Science", "Social Work", "Sociology",
  "South Asian Studies Programme", "Southeast Asian Studies",
  "Sports and UTown Management",
  "Statistics & Applied Probability", "Strategy & Policy",
  "Student Affairs", "Surgery",
  "University Communications", "University Scholars Programme",
  "University Town Management",
];

// Generate abbreviation from name
function makeAbbr(name) {
  const skip = ["and", "the", "&", "for", "of"];
  const words = name.split(/[\s]+/).filter((w) => !skip.includes(w.toLowerCase()));
  if (words.length === 1) return words[0].substring(0, 3).toUpperCase();
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Seeded pseudo-random for consistent metrics
function seededRandom(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = ((s << 5) - s + seed.charCodeAt(i)) | 0;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s & 0x7fffffff) / 0x7fffffff;
  };
}

function generateMetrics(name) {
  const rand = seededRandom(name);
  return {
    satisfaction: Math.round(40 + rand() * 55),
    engagement: Math.round(35 + rand() * 60),
    workload: Math.round(30 + rand() * 60),
    burnout: Math.round(15 + rand() * 55),
    support: Math.round(40 + rand() * 55),
  };
}

function generateHR(name) {
  const rand = seededRandom(name + "_hr");
  return {
    headcount: Math.round(20 + rand() * 280),
    turnover: +(2 + rand() * 14).toFixed(1),
    avgLeave: Math.round(3 + rand() * 12),
    satisfaction: Math.round(50 + rand() * 45),
    performanceRating: +(2.5 + rand() * 2.4).toFixed(1),
  };
}

// Build departments array
export const departments = departmentList.map((name) => ({
  name,
  abbr: makeAbbr(name),
  metrics: generateMetrics(name),
  hr: generateHR(name),
}));

// Get unique first letters for the alphabet index
export const letters = [
  ...new Set(departmentList.map((n) => n[0].toUpperCase())),
].sort();

// Metrics config
export const metricConfig = [
  { key: "satisfaction", label: "Satisfaction", inverse: false },
  { key: "engagement", label: "Engagement", inverse: false },
  { key: "workload", label: "Workload stress", inverse: true },
  { key: "burnout", label: "Burnout risk", inverse: true },
  { key: "support", label: "Support access", inverse: false },
];

export const hrConfig = [
  { key: "headcount", label: "Headcount", unit: "" },
  { key: "turnover", label: "Turnover rate", unit: "%" },
  { key: "avgLeave", label: "Avg. medical leave", unit: " days" },
  { key: "satisfaction", label: "Satisfaction", unit: "/100" },
  { key: "performanceRating", label: "Performance rating", unit: "/5.0" },
];
