const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function backupCandidates() {
  const snapshot = await db.collection('candidates').get();
  const candidates = [];
  
  snapshot.forEach(doc => {
    candidates.push({
      id: doc.id,
      ...doc.data()
    });
  });

  const backupDir = path.join(__dirname, '../backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const filename = `candidates-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(
    path.join(backupDir, filename),
    JSON.stringify(candidates, null, 2)
  );

  console.log(`✅ Backup creado: ${filename} (${candidates.length} candidatos)`);
}

backupCandidates();