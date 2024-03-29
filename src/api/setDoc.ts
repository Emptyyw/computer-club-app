import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebase/firebase';
import { User } from 'api/db';
import { UserCredential } from 'firebase/auth';

export function getFirestore() {
  return db;
}

export async function saveUserToDb(
  userCredential: UserCredential,
  login: string,
  role: string,
  lastName?: string,
  firstName?: string,
  avatarUrl?: string,
) {
  const user = userCredential.user;
  if (user) {
    const userData: User = {
      firstName,
      lastName,
      login: login,
      email: user.email || '',
      id: user.uid,
      role,
    };
    if (avatarUrl) {
      userData.avatarUrl = avatarUrl;
    }
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, userData);
    return userData;
  } else {
    throw new Error('User saving failed');
  }
}
