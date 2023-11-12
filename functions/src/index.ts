import { setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

export interface Watch {
  emergency: string;
  latitude: string;
  longitude: string;
  id: string;
  name: string;
  phone: string;
  photoURL: string;
  emergencyTimestamp: Date;
}
initializeApp();
setGlobalOptions({ region: "asia-east1", maxInstances: 10 });

exports.makeuppercase = onDocumentUpdated(
  "location/{watchId}",
  async (event) => {
    if (!event || !event.data) return;

    const oldReadingData = event.data.before.data() as Watch;
    const newReadingData = event.data.after.data() as Watch;

    if (oldReadingData.emergency === "0" && newReadingData.emergency === "1") {
      return event.data.after.ref.set(
        { emergencyTimestamp: new Date() },
        { merge: true }
      );
    }

    return;

    // logger.info(`newReadingData.count: ${newReadingData.count}`, {
    //   structuredData: true,
    // });
    // logger.info(`newMosquitoDetectedState: ${newMosquitoDetectedState}`, {
    //   structuredData: true,
    // });
  }
);
