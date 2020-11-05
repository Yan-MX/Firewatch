import firebase from "firebase";
import { useEffect, useState } from "react";
import { DataObject } from "../../App";

const collectionName: string = "FireData";
const countFileName: string = "CollectionRowCount";

interface Props {
  dataCount: number;
  setDataCount: (dataCount: number) => void;
}

/**
 * CRUD for DataObject documents
 */
export function addCountFile() {
  firebase
    .firestore()
    .collection(collectionName)
    .doc(countFileName)
    .set({ count: 0 });
}

export function setCountInCountFile(realCount: number) {
  firebase
    .firestore()
    .collection(collectionName)
    .doc(countFileName)
    .set({ count: realCount });
}

export function addData(Data: DataObject) {
  firebase.firestore().collection(collectionName).add(Data);
}

export async function getDataCount({ dataCount, setDataCount }: Props) {
  const countDocRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(countFileName);
  countDocRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Count file exists with current value:", doc.get("count"));
        setDataCount(doc.get("count"));
      } else {
        // doc.data() will be undefined in this case
        console.log("Count file does not exist: ", countFileName);
      }
    })
    .catch(function (error) {
      console.log("Error getting count file document:", error);
    });
}

export function getData(id: any) {
  const DataObjectDocRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(id);

  return DataObjectDocRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      return docSnapshot.data() as DataObject;
    } else {
      return null;
    }
  });
}

export function useAllDataFromFB() {
  const [data, setData] = useState<DataObject[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(collectionName)
      .get()
      .then(function (querySnapshot) {
        const dataObjects: DataObject[] = [];
        querySnapshot.forEach(function (doc) {
          const dataObject = { ...doc.data() } as DataObject;
          dataObjects.push(dataObject);
        });
        setData(dataObjects);
      });
  }, []);

  // console.log("data: ", data);
  return data;
}

export function useAllDataFromFBWithUpdates(dataList: DataObject[]) {
  const [data, setData] = useState<DataObject[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(collectionName)
      .get()
      .then(function (querySnapshot) {
        const dataObjects: DataObject[] = [];
        querySnapshot.forEach(function (doc) {
          const dataObject = { ...doc.data() } as DataObject;
          dataObjects.push(dataObject);
        });
        setData(dataObjects);
      });
  }, [dataList]);

  console.log("useAllDataFromFBWithUpdates data: ", data);
  return data;
}

export function deleteData(id: any) {
  return firebase.firestore().collection(collectionName).doc(id).delete();
}

// 🔥 Implement transaction for updating the DataObject to avoid conflicting updates
export function updateDataTransaction(
  id: any,
  DataObjectData: Partial<DataObject>
) {}
