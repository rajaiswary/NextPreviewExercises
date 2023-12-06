'use client';
import type { AppProps } from "next/app";
import '@contentful/live-preview/style.css';
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

export default function App({ Component, pageProps }: AppProps) {
  return(
  <ContentfulLivePreviewProvider
    locale="en-US"
    enableInspectorMode={true}
    enableLiveUpdates={true}
  >
    <Component {...pageProps} />
  </ContentfulLivePreviewProvider>
  )
}
