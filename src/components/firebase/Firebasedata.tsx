import { useEffect, useState } from "react";
import firebase from "firebase";
import { DataObject } from "../../App";

export default function Firebasedata() {
  // const [games, setGames] = useState<Game[]>([]);
  const datagroup: DataObject[] = [];
  useEffect(() => {
    firebase
      .firestore()
      .collection("datalist")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const Data1 = { ...doc.data() } as DataObject;
          datagroup.push(Data1);
        });
        console.log(datagroup);
      });
  }, []);

  return datagroup;
}
