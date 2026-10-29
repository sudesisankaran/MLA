import { db, isFirebaseConfigured } from '../firebase/config';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import {
  INITIAL_COMPLAINTS,
  INITIAL_NEWS,
  INITIAL_PROJECTS,
  INITIAL_GALLERY
} from '../data/constituencyData';

const LOCAL_STORAGE_KEYS = {
  COMPLAINTS: 'tvk_mla_complaints',
  NEWS: 'tvk_mla_news',
  PROJECTS: 'tvk_mla_projects',
  GALLERY: 'tvk_mla_gallery',
  ENQUIRIES: 'tvk_mla_enquiries'
};

// Helper to init localStorage
const initLocalStore = (key, initialData) => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
};

// Ensure localStorage has data
const getLocalData = (key, defaultData) => {
  return initLocalStore(key, defaultData);
};

const setLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* ==================== COMPLAINTS SERVICE ==================== */

export const createComplaint = async (complaintData) => {
  // Generate TVK-2026-XXXXX Reference ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const refId = `TVK-2026-${randomNum}`;

  const newComplaint = {
    id: refId,
    category: complaintData.category || 'other',
    subject: complaintData.subject,
    description: complaintData.description,
    citizenName: complaintData.citizenName,
    citizenPhone: complaintData.citizenPhone,
    district: complaintData.district || 'Viluppuram',
    constituency: complaintData.constituency || 'Vikravandi',
    location: complaintData.location,
    urgency: complaintData.urgency || 'normal',
    attachmentUrl: complaintData.attachmentUrl || null,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    assignedOfficer: 'Under Redressal Assignment',
    department: 'Constituency Grievance Redressal Cell',
    publicUpdates: [
      {
        date: new Date().toISOString(),
        author: 'System Verification',
        text: 'புகார் மனு முறைப்படி பதியப்பட்டது. முதற்கட்ட பரிசீலனை தொடங்கப்பட்டுள்ளது.'
      }
    ],
    internalNotes: 'Citizen grievance logged via Web Portal.'
  };

  if (isFirebaseConfigured() && db) {
    try {
      const complaintRef = doc(db, 'complaints', refId);
      await setDoc(complaintRef, {
        ...newComplaint,
        createdAt: serverTimestamp()
      });
      return newComplaint;
    } catch (error) {
      console.warn('Firestore write failed, falling back to local storage:', error);
    }
  }

  // Local fallback
  const list = getLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  list.unshift(newComplaint);
  setLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, list);
  return newComplaint;
};

export const getComplaintByRef = async (refId) => {
  const cleanId = (refId || '').trim().toUpperCase();

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'complaints', cleanId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (e) {
      console.warn('Firestore fetch error, checking local store:', e);
    }
  }

  const list = getLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  return list.find(c => c.id.toUpperCase() === cleanId) || null;
};

export const getUserComplaints = async (phone) => {
  const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'complaints'), where('citizenPhone', '==', cleanPhone));
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach(doc => results.push(doc.data()));
      if (results.length > 0) return results;
    } catch (e) {
      console.warn('Firestore user complaints query error:', e);
    }
  }

  const list = getLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  return list.filter(c => (c.citizenPhone || '').replace(/\D/g, '').slice(-10) === cleanPhone);
};

export const getAllComplaints = async () => {
  if (isFirebaseConfigured() && db) {
    try {
      const querySnapshot = await getDocs(collection(db, 'complaints'));
      const list = [];
      querySnapshot.forEach(doc => list.push(doc.data()));
      if (list.length > 0) return list;
    } catch (e) {
      console.warn('Firestore getAllComplaints error:', e);
    }
  }

  return getLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
};

export const updateComplaintStatus = async ({
  refId,
  status,
  publicUpdateText,
  internalNote,
  assignedOfficer,
  department
}) => {
  const cleanId = (refId || '').trim().toUpperCase();
  const updatePayload = {
    status,
    ...(assignedOfficer && { assignedOfficer }),
    ...(department && { department })
  };

  // Local update helper
  const list = getLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  const index = list.findIndex(c => c.id.toUpperCase() === cleanId);

  let updatedComplaint = null;

  if (index !== -1) {
    const existing = list[index];
    const newUpdates = [...(existing.publicUpdates || [])];
    
    if (publicUpdateText && publicUpdateText.trim()) {
      newUpdates.push({
        date: new Date().toISOString(),
        author: 'MLA Secretariat Redressal Cell',
        text: publicUpdateText.trim()
      });
    }

    updatedComplaint = {
      ...existing,
      ...updatePayload,
      publicUpdates: newUpdates,
      internalNotes: internalNote ? `${existing.internalNotes || ''}\n[${new Date().toLocaleDateString()}]: ${internalNote}` : existing.internalNotes
    };

    list[index] = updatedComplaint;
    setLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, list);
  }

  // Also sync to Firestore if live
  if (isFirebaseConfigured() && db && updatedComplaint) {
    try {
      const complaintDoc = doc(db, 'complaints', cleanId);
      await updateDoc(complaintDoc, {
        status: updatedComplaint.status,
        assignedOfficer: updatedComplaint.assignedOfficer,
        publicUpdates: updatedComplaint.publicUpdates,
        internalNotes: updatedComplaint.internalNotes,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Firestore update error:', e);
    }
  }

  return updatedComplaint;
};

/* ==================== NEWS SERVICE ==================== */

export const getNewsList = async () => {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'news'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      if (list.length > 0) return list;
    } catch (e) {
      console.warn('Firestore news fetch error:', e);
    }
  }
  return getLocalData(LOCAL_STORAGE_KEYS.NEWS, INITIAL_NEWS);
};

export const addNewsItem = async (newsItem) => {
  const itemWithId = {
    ...newsItem,
    id: `news-${Date.now()}`,
    date: newsItem.date || new Date().toISOString().split('T')[0]
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, 'news', itemWithId.id), itemWithId);
    } catch (e) {
      console.warn('Firestore add news error:', e);
    }
  }

  const list = getLocalData(LOCAL_STORAGE_KEYS.NEWS, INITIAL_NEWS);
  list.unshift(itemWithId);
  setLocalData(LOCAL_STORAGE_KEYS.NEWS, list);
  return itemWithId;
};

export const deleteNewsItem = async (newsId) => {
  const list = getLocalData(LOCAL_STORAGE_KEYS.NEWS, INITIAL_NEWS);
  const filtered = list.filter(item => item.id !== newsId);
  setLocalData(LOCAL_STORAGE_KEYS.NEWS, filtered);
  return true;
};

/* ==================== DEVELOPMENT PROJECTS SERVICE ==================== */

export const getProjectsList = async () => {
  if (isFirebaseConfigured() && db) {
    try {
      const snap = await getDocs(collection(db, 'developmentProjects'));
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      if (list.length > 0) return list;
    } catch (e) {
      console.warn('Firestore projects fetch error:', e);
    }
  }
  return getLocalData(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
};

export const addProjectItem = async (projectItem) => {
  const itemWithId = {
    ...projectItem,
    id: `proj-${Date.now()}`
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, 'developmentProjects', itemWithId.id), itemWithId);
    } catch (e) {
      console.warn('Firestore add project error:', e);
    }
  }

  const list = getLocalData(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  list.unshift(itemWithId);
  setLocalData(LOCAL_STORAGE_KEYS.PROJECTS, list);
  return itemWithId;
};

export const updateProjectProgress = async (projectId, progressPercent, status) => {
  const list = getLocalData(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const index = list.findIndex(p => p.id === projectId);
  if (index !== -1) {
    list[index].progress = Number(progressPercent);
    if (status) list[index].status = status;
    setLocalData(LOCAL_STORAGE_KEYS.PROJECTS, list);
  }
  return list[index];
};

/* ==================== GALLERY SERVICE ==================== */

export const getGalleryList = async () => {
  if (isFirebaseConfigured() && db) {
    try {
      const snap = await getDocs(collection(db, 'gallery'));
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      if (list.length > 0) return list;
    } catch (e) {
      console.warn('Firestore gallery fetch error:', e);
    }
  }
  return getLocalData(LOCAL_STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
};

export const addGalleryItem = async (item) => {
  const itemWithId = {
    ...item,
    id: `gal-${Date.now()}`,
    date: item.date || new Date().toISOString().split('T')[0]
  };
  const list = getLocalData(LOCAL_STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  list.unshift(itemWithId);
  setLocalData(LOCAL_STORAGE_KEYS.GALLERY, list);
  return itemWithId;
};

/* ==================== ENQUIRIES & FEEDBACK SERVICE ==================== */

export const submitCitizenEnquiry = async (enquiryData) => {
  const newEnquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    submittedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, 'enquiries', newEnquiry.id), newEnquiry);
    } catch (e) {
      console.warn('Firestore enquiry submit error:', e);
    }
  }

  const list = getLocalData(LOCAL_STORAGE_KEYS.ENQUIRIES, []);
  list.unshift(newEnquiry);
  setLocalData(LOCAL_STORAGE_KEYS.ENQUIRIES, list);
  return newEnquiry;
};

/* ==================== RESET BASELINE DATA ==================== */

export const resetAllData = () => {
  setLocalData(LOCAL_STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  setLocalData(LOCAL_STORAGE_KEYS.NEWS, INITIAL_NEWS);
  setLocalData(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  setLocalData(LOCAL_STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  return true;
};

