const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Scheme = require('./models/schemeModel');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const schemes = [
  {
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    description: 'MGNREGA aims to enhance livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
    benefits: [
      'Guaranteed 100 days of employment per household per year',
      'Equal wages for men and women',
      'Unemployment allowance if work is not provided',
      'Worksite facilities like drinking water, shade, and first aid'
    ],
    eligibility: [
      'Indian citizen',
      'Above 18 years of age',
      'Willing to do unskilled manual work',
      'Rural household'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Job card',
      'Bank account details'
    ],
    applicationProcess: 'Visit the local Gram Panchayat office to register and get a Job Card',
    website: 'https://nrega.nic.in/',
    category: 'Employment'
  },
  {
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'PM-KISAN is a Central Sector Scheme with 100% funding from the Government of India. Under the scheme, income support of Rs. 6,000 per year is provided to all farmer families across the country.',
    benefits: [
      'Rs. 6,000 per year in three equal installments',
      'Direct transfer to bank accounts',
      'No middlemen involved',
      'Covers all farmer families'
    ],
    eligibility: [
      'Landholding farmers',
      'Small and marginal farmers',
      'Farmer families with cultivable land'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Land records',
      'Bank account details'
    ],
    applicationProcess: 'Register through the PM-KISAN portal or visit the nearest Common Service Centre',
    website: 'https://pmkisan.gov.in/',
    category: 'Agriculture'
  },
  {
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    description: 'PMAY aims to provide affordable housing to the urban poor with a target of building 20 million affordable houses by 31 March 2022.',
    benefits: [
      'Interest subsidy on home loans',
      'Financial assistance for construction',
      'In-situ slum rehabilitation',
      'Affordable housing in partnership'
    ],
    eligibility: [
      'Economically Weaker Section (EWS)',
      'Low Income Group (LIG)',
      'Middle Income Group (MIG)',
      'Urban poor'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Income certificate',
      'Property documents',
      'Bank account details'
    ],
    applicationProcess: 'Apply through the PMAY portal or visit the nearest Common Service Centre',
    website: 'https://pmaymis.gov.in/',
    category: 'Housing'
  }
];

const seedSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    // Insert new schemes
    await Scheme.insertMany(schemes);
    console.log('Successfully seeded schemes');

    process.exit();
  } catch (error) {
    console.error('Error seeding schemes:', error);
    process.exit(1);
  }
};

seedSchemes(); 