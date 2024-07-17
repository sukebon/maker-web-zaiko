import { db } from "@/firebase";
import { Switch, Td } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { FC } from "react";

type Props = {
  uid: string;
  isMaker?: boolean;
  title: string;
};
export const AdminTableTd: FC<Props> = ({ uid, isMaker, title }) => {
  const checked = isMaker ? true : false;

  const updateMaker = async () => {
    const makerDoc = doc(db, "users", `${uid}`, "permissions", "maker");
    updateDoc(makerDoc, {
      [title]: !isMaker,
    });
  };

  return (
    <Td>
      <Switch id="email-alerts" isChecked={checked} onChange={updateMaker} />
    </Td>
  );
};
