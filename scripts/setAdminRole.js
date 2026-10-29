/**
 * Server-Side Script to Assign Admin Role via Firebase Admin SDK
 * 
 * Usage:
 * 1. Download your service account key from Firebase Console -> Project Settings -> Service Accounts.
 * 2. Save as 'serviceAccountKey.json' in this directory (never commit to git).
 * 3. Run: node scripts/setAdminRole.js <user-uid-or-phone>
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setStaffAdmin(identifier) {
  try {
    let userRecord;
    if (identifier.startsWith('+91')) {
      userRecord = await admin.auth().getUserByPhoneNumber(identifier);
    } else {
      userRecord = await admin.auth().getUser(identifier);
    }

    // Set custom claim { role: 'admin', admin: true }
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true,
      role: 'admin',
      constituency: 'Vikravandi'
    });

    console.log(`✅ Success: Assigned staff admin role to UID: ${userRecord.uid} (${userRecord.phoneNumber || userRecord.email})`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting admin claims:', error);
    process.exit(1);
  }
}

const targetUser = process.argv[2] || '+919840123456';
console.log(`Setting admin role for: ${targetUser}...`);
setStaffAdmin(targetUser);

