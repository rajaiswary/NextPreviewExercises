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
  
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string;

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
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
