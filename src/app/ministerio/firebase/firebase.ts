import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Check authentication state
const checkAuth = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Upload file to Firebase Storage
const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Save event to Firestore
const saveEvent = async (title: string, description: string, imageUrl?: string, videoUrl?: string): Promise<void> => {
  try {
    await addDoc(collection(db, "events"), {
      title,
      description,
      imageUrl: imageUrl || "",
      videoUrl: videoUrl || "",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
};

// Fetch events from Firestore
const fetchEvents = async (): Promise<DocumentData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export { auth, db, storage, signInWithEmailAndPassword, signOut, checkAuth, uploadFile, saveEvent, fetchEvents };