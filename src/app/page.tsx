"use client";
import React from "react";
import { ContainerScrollCentered } from "@/components/ui/container-scroll-animation-centered";
import Image from "next/image";
import { MessageSquareCodeIcon, PackageOpenIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cardRevealCenteredPreset } from "@/components/ui/panel-animation/presets";
import { contentRightPreset } from "@/components/ui/panel-animation/presets";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden pb-[2000px] pt-[10px]">
      <div className="absolute top-0 left-0 w-full h-full">
      <ContainerScrollCentered
        preset={contentRightPreset}
        titleComponent={
          <div className="pt-10">
            </div>
        }
      >
        <GlowingEffectDemo />
      </ContainerScrollCentered>
      </div>
      <ContainerScrollCentered
        preset={cardRevealCenteredPreset}
      panel="default"
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Own your docs <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                TinaDocs
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/tina-screenshot.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScrollCentered>
      {/* <GlowingEffectDemo /> */}
    </div>
  );
};
 
function GlowingEffectDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <GridItem
        icon={<PackageOpenIcon className="h-5 w-5" />}
        title="Totally Open Source"
        description={<>TinaDocs is <strong>open source</strong> and free to use. Edit and extend however you like.</>}
      />
      <GridItem
        icon={<div className="h-5 w-5"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> </div>}
        title="GitHub Backed"
        description={<>TinaDocs is backed by GitHub, so <strong>you control your content</strong> in document format.</>}
      />
      <GridItem
        icon={<MessageSquareCodeIcon className="h-5 w-5" />}
        title="API Generation"
        description={<>Create document pages from <strong>your own OpenAPI spec</strong>, with tailored components for your API.</>}
      />
    </div>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}