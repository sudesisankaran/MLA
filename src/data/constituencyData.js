export const INITIAL_REPRESENTATIVE = {
  name: {
    ta: "தொகுதி சட்டமன்ற உறுப்பினர் (MLA)",
    en: "Member of Legislative Assembly (MLA)"
  },
  title: {
    ta: "விக்கிரவாண்டி சட்டமன்ற தொகுதி மக்கள் சேவை மையம்",
    en: "Vikravandi Constituency Public Service Secretariat"
  },
  partyAffiliation: {
    ta: "தமிழக வெற்றிக் கழகம் (TVK)",
    en: "Tamizhaga Vettri Kazhagam (TVK)"
  },
  verifiedBadge: true,
  term: "2026 - Present",
  officeAddress: {
    ta: "எண் 42, மக்கள் சேவை மையம், அண்ணா சாலை, விக்கிரவாண்டி, விழுப்புரம் மாவட்டம் - 605652",
    en: "No. 42, Citizen Service Center, Anna Salai, Vikravandi, Viluppuram District - 605652"
  },
  phone: "+91 98401 23456",
  email: "mla.vikravandi@tamilnadu.gov.in"
};

export const INITIAL_COMPLAINTS = [
  {
    id: "TVK-2026-08142",
    category: "water",
    subject: "உடைந்த குடிநீர் பிரதான குழாய் உடனடியாக சரிசெய்யப்பட வேண்டும்",
    subjectEn: "Urgent repair needed for burst main drinking water pipe",
    description: "விக்கிரவாண்டி மெயின் பஜார், காந்தி சிலை அருகில் கடந்த 3 நாட்களாக பிரதான குடிநீர் குழாயில் விரிசல் ஏற்பட்டு பெருமளவு தூய குடிநீர் வீணாக சாக்கடையில் கலக்கிறது. இதனால் அப்பகுதி 150 குடும்பங்களுக்கு குடிநீர் விநியோகம் தடைபட்டுள்ளது.",
    citizenName: "சு. செல்வகுமார் (S. Selvakumar)",
    citizenPhone: "9876543210",
    district: "Viluppuram",
    constituency: "Vikravandi",
    location: "Ward No. 4, Near Gandhi Statue, Main Bazaar",
    urgency: "urgent",
    status: "in_progress",
    submittedAt: "2026-10-24T10:30:00Z",
    assignedOfficer: "R. Sundaram (Assistant Engineer, TWAD Board)",
    department: "Tamil Nadu Water Supply & Drainage Board",
    publicUpdates: [
      {
        date: "2026-10-24T14:15:00Z",
        author: "MLA Public Grievance Cell",
        text: "புகார் பெறப்பட்டு TWAD உதவி பொறியாளர் சுந்தரம் அவர்களுக்கு உடனடி ஆய்வுக்காக அனுப்பப்பட்டுள்ளது."
      },
      {
        date: "2026-10-25T11:00:00Z",
        author: "TWAD Engineer Office",
        text: "கள ஆய்வு நிறைவடைந்தது. புதிய 150மிமீ DI குழாய்கள் கொள்முதல் செய்யப்பட்டு களப்பணி துவங்கியுள்ளது. 24 மணி நேரத்திற்குள் விநியோகம் சீராகும்."
      }
    ],
    internalNotes: "Funds sanction expedited under MLA Local Area Development contingency pool."
  },
  {
    id: "TVK-2026-08143",
    category: "roads",
    subject: "பள்ளி பேருந்து செல்லும் இணைப்புச் சாலையில் உள்ள ஆபத்தான பள்ளங்கள்",
    subjectEn: "Potholes on school bus arterial route connecting Radhapuram",
    description: "இராதாபுரம் அரசு மேல்நிலைப் பள்ளிக்கு செல்லும் 1.5 கிமீ தார் சாலையில் பெரிய அளவில் பள்ளங்கள் உள்ளன. மழைக்காலத்தில் மழைநீர் தேங்கி பள்ளி மாணவர்கள் மற்றும் பொதுமக்களுக்கு விபத்து அபாயம் உள்ளது.",
    citizenName: "மு. கவிதா (M. Kavitha)",
    citizenPhone: "9876543211",
    district: "Viluppuram",
    constituency: "Vikravandi",
    location: "Radhapuram to Vikravandi Link Road, Ward 11",
    urgency: "urgent",
    status: "under_review",
    submittedAt: "2026-10-26T09:15:00Z",
    assignedOfficer: "P. Murugesan (Highways Dept Supervisor)",
    department: "State Highways & Rural Roads",
    publicUpdates: [
      {
        date: "2026-10-26T12:00:00Z",
        author: "MLA Secretariat",
        text: "புகார் பதிவு செய்யப்பட்டு நெடுஞ்சாலை துறை கண்காணிப்பாளரிடம் சாலை மறுசீரமைப்பு திட்ட மதிப்பீட்டிற்காக ஒப்படைக்கப்பட்டுள்ளது."
      }
    ],
    internalNotes: "Included in Phase 2 Constituency Bitumen Re-laying budget."
  },
  {
    id: "TVK-2026-08144",
    category: "electricity",
    subject: "தெருவிளக்குகள் எரியாததால் பெண்கள் இரவு நேரங்களில் அச்சம்",
    subjectEn: "Non-functional streetlights causing safety issues at night",
    description: "காமராஜர் நகர் 2வது தெருவில் 8 தெருவிளக்குகள் கடந்த இரண்டு வாரங்களாக எரியவில்லை. முதியோர்கள் மற்றும் பணி முடிந்து வரும் பெண்கள் இரவு நேரங்களில் செல்ல பெரும் சிரமப்படுகின்றனர்.",
    citizenName: "ஆ. ராமகிருஷ்ணன் (A. Ramakrishnan)",
    citizenPhone: "9876543212",
    district: "Viluppuram",
    constituency: "Vikravandi",
    location: "Kamarajar Nagar 2nd Street, Ward 6",
    urgency: "normal",
    status: "resolved",
    submittedAt: "2026-10-20T16:00:00Z",
    assignedOfficer: "K. Balamurugan (TANGEDCO Junior Engineer)",
    department: "TANGEDCO (Electricity Board)",
    publicUpdates: [
      {
        date: "2026-10-21T10:00:00Z",
        author: "TANGEDCO Vikravandi",
        text: "புதிய 45W எல்இடி பல்புகள் மாற்றப்பட்டு தெருவிளக்குகள் அனைத்தும் செயல்பாட்டிற்கு கொண்டு வரப்பட்டன."
      },
      {
        date: "2026-10-21T17:30:00Z",
        author: "MLA Public Grievance Cell",
        text: "மனுதாரரிடம் நேரடி கைபேசி வாயிலாக சரிபார்க்கப்பட்டு மனு வெற்றிகரமாக தீர்க்கப்பட்டது."
      }
    ],
    internalNotes: "Citizen verified and acknowledged receipt."
  },
  {
    id: "TVK-2026-08145",
    category: "education",
    subject: "அரசு நடுநிலைப் பள்ளி கூடுதல் வகுப்பறை மற்றும் கணினி ஆய்வகம் கோரிக்கை",
    subjectEn: "Request for additional classrooms and computer lab in Govt School",
    description: "எங்கள் கிராம அரசு பள்ளியில் மாணவர் சேர்க்கை அதிகரித்துள்ளதால் போதுமான வகுப்பறைகள் இல்லை. மேலும் மாணவர்களுக்கு டிஜிட்டல் கல்வி புகட்ட 10 கணினிகள் கொண்ட கணினி கூடம் அமைக்க வேண்டும்.",
    citizenName: "பெ. இளங்கோவன் (P. Elangovan, PTA President)",
    citizenPhone: "9876543213",
    district: "Viluppuram",
    constituency: "Vikravandi",
    location: "Govt Middle School, Panayapuram Village",
    urgency: "normal",
    status: "submitted",
    submittedAt: "2026-10-28T14:45:00Z",
    assignedOfficer: "Pending Assignment",
    department: "School Education Department & MLA Constituency Fund",
    publicUpdates: [
      {
        date: "2026-10-28T15:00:00Z",
        author: "System",
        text: "மனு சமர்ப்பிக்கப்பட்டது. அலுவலக பரிசீலனையில் உள்ளது."
      }
    ],
    internalNotes: "Can be proposed under the MLA Constituency Development Scheme 2026-27."
  }
];

export const INITIAL_NEWS = [
  {
    id: "news-1",
    title: {
      ta: "விக்கிரவாண்டி பைபாஸ் மைதானத்தில் நடைபெற்ற மாபெரும் மக்கள் சந்திப்பு மற்றும் நலத்திட்ட உதவிகள்",
      en: "Massive Citizen Outreach & Welfare Aid Distribution at Vikravandi Bypass Grounds"
    },
    category: "meetings",
    date: "2026-10-22",
    summary: {
      ta: "தொகுதி மக்களின் 1,400க்கும் மேற்பட்ட குடும்பங்களுக்கு நலத்திட்ட உதவிகள் மற்றும் விவசாய உபகரணங்கள் வழங்கப்பட்டன.",
      en: "Welfare materials and agricultural equipment distributed to over 1,400 beneficiary families."
    },
    content: {
      ta: "விக்கிரவாண்டி தொகுதியில் நடைபெற்ற மக்கள் சந்திப்பு முகாமில், பொதுமக்களின் நீண்ட நாள் கோரிக்கையான தூர்வாரும் பணிகள் மற்றும் குடிநீர் திட்டங்களுக்கு உடனடி நிதி ஒதுக்கீடு ஆணை வழங்கப்பட்டது. விழாவில் 400க்கும் மேற்பட்ட மகளிர் சுயஉதவிக் குழுக்களுக்கு தொழிற்கடன் ஆணைகளும், மாற்றுத்திறனாளிகளுக்கு மூன்று சக்கர வாகனங்களும் வழங்கப்பட்டன.",
      en: "At the grand constituency outreach camp, immediate administrative sanctions were issued for desilting water bodies and expanding local pipelines. Over 400 women self-help groups received financial support certificates."
    },
    imageUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800",
    location: "Vikravandi Bypass Grounds",
    sourceLink: "https://tndipr.gov.in/"
  },
  {
    id: "news-2",
    title: {
      ta: "₹18.5 கோடி மதிப்பிலான 45 கிராமங்களுக்கான கூட்டு குடிநீர் திட்டம் தொடங்கி வைப்பு",
      en: "Inauguration of ₹18.5 Cr Combined Drinking Water Scheme for 45 Villages"
    },
    category: "press",
    date: "2026-10-15",
    summary: {
      ta: "தென்பெண்ணை ஆற்றுப்படுகையில் ஆழ்துளை கிணறுகள் அமைக்கப்பட்டு 45 கிராமங்களுக்கு தடையற்ற தூய நீர்.",
      en: "Deep infiltration wells and modern purification systems commissioned to ensure uninterrupted supply."
    },
    content: {
      ta: "விக்கிரவாண்டி தொகுதியின் பல கிராமங்களில் கோடை காலத்தில் நிலவி வந்த குடிநீர் தட்டுப்பாட்டிற்கு நிரந்தர தீர்வாக அமையவுள்ள புதிய கூட்டு குடிநீர் திட்டத்தின் இறுதிக்கட்ட பணிகளை சட்டமன்ற உறுப்பினர் ஆய்வு செய்தார்.",
      en: "The MLA inspected the final phase pipeline testing of the massive joint drinking water project which will permanently resolve summer scarcity."
    },
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    location: "Thenpennai Basin Water Works",
    sourceLink: "https://twadboard.tn.gov.in/"
  },
  {
    id: "news-3",
    title: {
      ta: "இளைஞர்களுக்கான இலவச TNPSC & வங்கித் தேர்வு பயிற்சி மையம் துவக்கம்",
      en: "Free TNPSC & Banking Competitive Exam Guidance Academy Inaugurated"
    },
    category: "announcements",
    date: "2026-10-05",
    summary: {
      ta: "கிராமப்புற மாணவ, மாணவிகள் பயனடையும் வகையில் டிஜிட்டல் நூலகம் மற்றும் இலவச பயிற்சி வகுப்புகள்.",
      en: "Rural youth provided with modern air-conditioned study hall, high-speed Wi-Fi, and expert faculties."
    },
    content: {
      ta: "தொகுதி இளைஞர்களின் கல்வி மற்றும் அரசு வேலைவாய்ப்பு கனவுகளை நனவாக்கும் பொருட்டு, இலவச பயிற்சி மையம் விக்கிரவாண்டியில் தொடங்கப்பட்டு 250 மாணவர்கள் முதற்கட்டமாக சேர்க்கப்பட்டுள்ளனர்.",
      en: "Aiming to empower rural students towards government service, the free coaching academy commenced with 250 enrolled students in its first batch."
    },
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    location: "MLA Constituency Study Center, Vikravandi",
    sourceLink: "https://employment.tn.gov.in/"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: {
      ta: "விக்கிரவாண்டி - முண்டியம்பாக்கம் 4-வழிச்சாலை மற்றும் அணுகுசாலை நவீனமயமாக்கல்",
      en: "Vikravandi - Mundiyampakkam 4-Lane Arterial Road Modernization"
    },
    category: "roads",
    budget: "₹ 14.80 கோடி",
    budgetVal: "₹ 14.80 Cr",
    status: "ongoing",
    progress: 75,
    location: "Vikravandi to Mundiyampakkam Hospital Route",
    executingAgency: "State Highways (Construction & Maintenance)",
    sourceGist: "G.O. Ms No. 142/HW/2025 (MLA Constituency Priority Fund)",
    sourceLink: "https://www.tnhighways.tn.gov.in/",
    startDate: "2025-06-15",
    targetDate: "2026-12-31",
    imageUrl: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-2",
    title: {
      ta: "45 கிராமங்களுக்கான கூட்டு குடிநீர் திட்டம் மற்றும் மேல்நிலை நீர்த்தேக்க தொட்டிகள்",
      en: "Combined Drinking Water Grid & Overhead Reservoirs for 45 Villages"
    },
    category: "water",
    budget: "₹ 18.50 கோடி",
    budgetVal: "₹ 18.50 Cr",
    status: "completed",
    progress: 100,
    location: "45 Panchayats across Vikravandi Block",
    executingAgency: "TWAD Board, Viluppuram Circle",
    sourceGist: "TWAD/CWSS/Project-Phase-IV Sanction Order 2024",
    sourceLink: "https://twadboard.tn.gov.in/",
    startDate: "2024-03-10",
    targetDate: "2025-09-30",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-3",
    title: {
      ta: "இராதாபுரம் அரசு ஆரம்ப சுகாதார நிலையம் 30 படுக்கை வசதி கொண்ட மருத்துவமனையாக தரம் உயர்த்துதல்",
      en: "Upgradation of Radhapuram Primary Health Center to 30-Bed Community Hospital"
    },
    category: "health",
    budget: "₹ 5.20 கோடி",
    budgetVal: "₹ 5.20 Cr",
    status: "ongoing",
    progress: 60,
    location: "Radhapuram PHC Campus",
    executingAgency: "Public Works Department (Medical Wing)",
    sourceGist: "Health & Family Welfare Dept Grant 2025-26",
    sourceLink: "https://nhm.tn.gov.in/",
    startDate: "2025-08-01",
    targetDate: "2027-03-31",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-4",
    title: {
      ta: "12 அரசு மேல்நிலைப் பள்ளிகளில் நவீன ஸ்மார்ட் வகுப்பறைகள் மற்றும் அறிவியல் ஆய்வகங்கள்",
      en: "Modern Smart Classrooms and STEM Labs across 12 Govt Higher Secondary Schools"
    },
    category: "education",
    budget: "₹ 3.40 கோடி",
    budgetVal: "₹ 3.40 Cr",
    status: "ongoing",
    progress: 90,
    location: "Vikravandi, Radhapuram, Panayapuram Schools",
    executingAgency: "Samagra Shiksha & School Education Dept",
    sourceGist: "School Education Modernization Initiative 2025",
    sourceLink: "https://tnschools.gov.in/",
    startDate: "2025-04-10",
    targetDate: "2026-11-15",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: {
      ta: "விக்கிரவாண்டி தொகுதி மக்கள் குறைதீர்ப்பு முகாம்",
      en: "Vikravandi Constituency Grievance Redressal Camp"
    },
    category: "events",
    date: "2026-10-20",
    location: "Town Hall, Vikravandi",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-2",
    title: {
      ta: "மழைக்கால முன்னெச்சரிக்கை ஏரிகள் தூர்வாரும் கள ஆய்வு",
      en: "Monsoon Preparedness Lake Desilting Inspection"
    },
    category: "works",
    date: "2026-10-12",
    location: "Panayapuram Irrigation Lake",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-3",
    title: {
      ta: "பள்ளி மாணவர்களுக்கு கல்வி உபகரணங்கள் மற்றும் ஊக்கத்தொகை வழங்கல்",
      en: "Educational Aid & Merit Scholarship Distribution to Rural Students"
    },
    category: "welfare",
    date: "2026-09-28",
    location: "Govt Girls High School Campus",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-4",
    title: {
      ta: "விவசாயிகள் உற்பத்தியாளர் சங்க நிர்வாகிகளுடன் கலந்தாய்வு கூட்டம்",
      en: "Interactive Discussion with Farmers Producer Organizations"
    },
    category: "events",
    date: "2026-09-14",
    location: "Agricultural Marketing Committee Office",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-5",
    title: {
      ta: "புதிய ஆரம்ப சுகாதார நிலைய கட்டிட அடிக்கல் நாட்டு விழா",
      en: "Foundation Stone Laying Ceremony for Primary Health Center"
    },
    category: "works",
    date: "2026-08-30",
    location: "Radhapuram PHC Grounds",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-6",
    title: {
      ta: "மகளிர் சுயஉதவிக் குழுக்களுக்கு தொழிற்கடன் ஒப்புதல் கடிதங்கள் வழங்கல்",
      en: "Self-Help Groups Livelihood Loan Sanction Distribution"
    },
    category: "welfare",
    date: "2026-08-15",
    location: "Community Center, Vikravandi",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800"
  }
];

