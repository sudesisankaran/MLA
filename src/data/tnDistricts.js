// List of Tamil Nadu Districts and Key Constituencies
export const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

export const CONSTITUENCIES_BY_DISTRICT = {
  "Chennai": ["Kolathur", "Thiru-Vi-Ka-Nagar", "Royapuram", "Harbour", "Chepauk-Thiruvallikeni", "Thousand Lights", "Anna Nagar", "Virugampakkam", "Saidapet", "Thiyagaraya Nagar", "Mylapore", "Velachery"],
  "Chengalpattu": ["Tambaram", "Pallavaram", "Chengalpattu", "Thiruporur", "Cheyyur", "Madurantakam"],
  "Kanchipuram": ["Kanchipuram", "Sriperumbudur", "Uthiramerur"],
  "Tiruvallur": ["Gummidipoondi", "Ponneri", "Tiruttani", "Thiruvallur", "Poonamallee", "Avadi", "Maduravoyal", "Ambattur"],
  "Madurai": ["Madurai North", "Madurai South", "Madurai Central", "Madurai West", "Madurai East", "Thirumangalam", "Usilampatti", "Melur", "Sholavandan"],
  "Coimbatore": ["Coimbatore North", "Coimbatore South", "Kavundampalayam", "Singanallur", "Sulur", "Thondamuthur", "Kinathukadavu", "Pollachi", "Valparai"],
  "Salem": ["Salem North", "Salem South", "Salem West", "Yercaud", "Omalur", "Mettur", "Edappadi", "Sankari", "Attur", "Gangavalli"],
  "Tiruchirappalli": ["Tiruchirappalli West", "Tiruchirappalli East", "Srirangam", "Thiruverumbur", "Lalgudi", "Manachanallur", "Musiri", "Thuraiyur", "Manapparai"],
  "Viluppuram": ["Viluppuram", "Vikravandi", "Tindivanam", "Vanur", "Gingee", "Mailam"],
  "Cuddalore": ["Cuddalore", "Panruti", "Kurinjipadi", "Bhuvanagiri", "Chidambaram", "Kattumannarkoil", "Tittakudi", "Vriddhachalam"]
};

export const COMPLAINT_CATEGORIES = [
  { id: "roads", en: "Roads & Transportation", ta: "சாலைகள் மற்றும் போக்குவரத்து" },
  { id: "water", en: "Drinking Water & Drainage", ta: "குடிநீர் மற்றும் கழிவுநீர் மேலாண்மை" },
  { id: "electricity", en: "Electricity & Streetlights", ta: "மின்சாரம் மற்றும் தெருவிளக்குகள்" },
  { id: "sanitation", en: "Public Health & Waste Disposal", ta: "சுகாதாரம் மற்றும் குப்பை அகற்றுதல்" },
  { id: "education", en: "Education & Schools / Anganwadis", ta: "கல்வி மற்றும் பள்ளிகள் / அங்கன்வாடி" },
  { id: "welfare", en: "Ration & Social Welfare Schemes", ta: "ரேஷன் மற்றும் மக்கள் நலத்திட்டங்கள்" },
  { id: "safety", en: "Women & Senior Citizen Safety", ta: "பெண்கள் மற்றும் முதியோர் பாதுகாப்பு" },
  { id: "other", en: "Other Civic Inconvenience", ta: "இதர பொதுப் பிரச்சனைகள்" }
];

export const COMPLAINT_STATUSES = [
  { id: "submitted", en: "Submitted", ta: "சமர்ப்பிக்கப்பட்டது", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "under_review", en: "Under Review", ta: "பரிசீலனையில் உள்ளது", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: "in_progress", en: "In Progress", ta: "செயல்பாட்டில் உள்ளது", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { id: "resolved", en: "Resolved", ta: "தீர்க்கப்பட்டது", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: "closed", en: "Closed", ta: "நிறைவுற்றது", color: "bg-slate-100 text-slate-800 border-slate-300" }
];

