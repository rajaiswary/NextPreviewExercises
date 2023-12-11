import { Entry, EntrySkeletonType, createClient } from "contentful";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

type Home = {
  data: Entry<EntrySkeletonType, undefined, string> | undefined;
};

export default function Home({ responseData } : any) {
  console.log(responseData);

  const inspectorProps = useContentfulInspectorMode();
  const updatedState = useContentfulLiveUpdates(responseData);

  return (
    <>
      <h1
        {...inspectorProps({
          entryId: responseData?.sys.id,
          fieldId: "sampleHeading",
        })}
      >
        {updatedState?.fields.simpleHeading}
      </h1>
    </>
  );
}

export async function getServerSideProps({preview}: any) {
  console.log("context: " + preview);
  
  const accessToken = "xvbvMYmZ_i9tUa5x1Iv_mGS5xoLUCMpzebJkOY84t6c";
  const previewToken = "X6C53ERCncqkVmmzdqJphw8hAh6IPvzKE7YrMHicP_8";

  const client = createClient({
    space: "lg78ad1ah3gx",
    accessToken: preview ? previewToken : accessToken,
    host: preview ? 'preview.contentful.com' : undefined,
  });
  const response = await client?.getEntries({
    content_type: "sampleHeading",
  });

  const responseData = response.items[0];
  return {
    props: {
      responseData,
    },
  };
}
