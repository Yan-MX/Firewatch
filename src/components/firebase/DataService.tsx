import firebase from "firebase";
import { DataObject } from "../../App";

/**
 * CRUD for DataObject documents
 */
export function addData(Data: DataObject) {
  return firebase.firestore().collection("Datalist").add(Data);
}

export function getData(id: any) {
  const DataObjectDocRef = firebase
    .firestore()
    .collection("DataObjects")
    .doc(id);

  return DataObjectDocRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      return docSnapshot.data() as DataObject;
    } else {
      return null;
    }
  });
}

export function deleteData(id: any) {
  return firebase.firestore().collection("DataObjects").doc(id).delete();
}

// 🔥 Implement transaction for updating the DataObject to avoid conflicting updates
export function updateDataTransaction(
  id: any,
  DataObjectData: Partial<DataObject>
) {}
