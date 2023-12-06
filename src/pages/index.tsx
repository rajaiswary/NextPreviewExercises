"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import { useState, useEffect } from "react";
import { draftMode } from 'next/headers';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

const inter = Inter({ subsets: ["latin"] });
type Home = {
  data: Entry<EntrySkeletonType, undefined, string> | undefined;
};

export default function Home() {
  const { isEnabled } = draftMode();
  const accessToken = 'xvbvMYmZ_i9tUa5x1Iv_mGS5xoLUCMpzebJkOY84t6c' ;
  const previewToken = 'X6C53ERCncqkVmmzdqJphw8hAh6IPvzKE7YrMHicP_8';
  console.log(isEnabled);

  const client = createClient({
    space: "lg78ad1ah3gx",

    accessToken: isEnabled ? previewToken : accessToken,
    host: isEnabled ? "preview.contentful.com" : undefined,
  });
  const [head, setHead] = useState<any>();

  const inspectorProps = useContentfulInspectorMode();
  const updatedState = useContentfulLiveUpdates(head);

  const headingResponse = async () => {
    const response = await client?.getEntries({
      content_type: "sampleHeading",
    });
    console.log("response", response);
    let variable = response.items[0];
    if (response) {
      setHead(variable);
    }
  };
  useEffect(() => {
    headingResponse();
  }, []);

  return (
    <>
      <h1
        {...inspectorProps({
          entryId: head?.sys.id,
          fieldId: "sampleHeading",
        })} 
      >
        {updatedState?.fields.simpleHeading}
      </h1>
    </>
  );
}
