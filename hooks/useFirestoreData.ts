import {
  DocumentReference,
  Timestamp,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { DependencyList, useEffect, useState } from "react";

export type FirestoreDataType<T> = T & {
  updateData: (new_fields: Partial<T>) => Promise<void>;
};

export const convertTimestampsToDate = (input: any): any => {
  const output = { ...input };
  for (const key in output) {
    if (output[key] instanceof Timestamp) {
      output[key] = output[key].toDate(); // Converts Timestamp to Date
    }
  }
  return output;
};

const useFirestoreData = <T>(
  dataDocRef: DocumentReference,
  constructEmpty: () => T,
  dependencyList: DependencyList = []
): [FirestoreDataType<T> | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateData = async (new_fields: Partial<T>) => {
    await updateDoc(dataDocRef, { ...new_fields });
  };

  useEffect(() => {
    const unsub = onSnapshot(dataDocRef, (doc) => {
      if (doc.exists()) {
        let rawData = doc.data();
        const dataWithConvertedDates = convertTimestampsToDate(rawData);
        setData((dataWithConvertedDates as T) ?? null);
      } else {
        setData(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, [...dependencyList]);

  if (data === null) {
    return [null, isLoading];
  }

  return [{ ...data, updateData }, isLoading];
};

export default useFirestoreData;
