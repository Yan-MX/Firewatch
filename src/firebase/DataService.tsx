import firebase from "firebase";
import { useEffect, useState } from "react";
import { DataObject } from "../types";

const collectionName: string = "FireData";
const countFileName: string = "CollectionRowCount";

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

export function addData(Data: DataObject) {
  firebase.firestore().collection(collectionName).add(Data);
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
