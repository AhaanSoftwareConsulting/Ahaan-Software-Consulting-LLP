import { lazy, Suspense } from "react";

const WebDevelopment = lazy(() => import("./WebDevelopment"));
const UiUxDesign = lazy(() => import("./UiUxDesign"));
const SocialMediaMarketing = lazy(() => import("./SocialMediaMarketing"));
const AppDevelopment = lazy(() => import("./AppDevelopment.tsx"));

const SectionSkeleton = () => (
  <div className="my-8 h-[300px] w-full animate-pulse rounded-xl bg-slate-100" />
);

export default function All() {
  return (
    <div className="relative mx-auto w-full max-w-[1600px] py-2 px-4 lg:px-6 2xl:px-10">
      <Suspense fallback={<SectionSkeleton />}>
        <div className="mb-10">
          <WebDevelopment />
        </div>
      </Suspense>

      <hr className="my-10 border-slate-200" />

      <Suspense fallback={<SectionSkeleton />}>
        <div className="mb-10">
          <UiUxDesign />
        </div>
      </Suspense>

      <hr className="my-10 border-slate-200" />

      <Suspense fallback={<SectionSkeleton />}>
        <div className="mb-10">
          <SocialMediaMarketing />
        </div>
      </Suspense>

      <hr className="my-10 border-slate-200" />

      <Suspense fallback={<SectionSkeleton />}>
        <AppDevelopment />
      </Suspense>
    </div>
  );
}