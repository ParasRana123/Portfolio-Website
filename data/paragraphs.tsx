import HoverLink, { LinkText } from "@/components/HoverLink";
import React from "react";

export const PARAGRAPHS = [
  <>
    I&apos;m Paras, a Computer Science undergrad at <LinkText>IIIT Nagpur</LinkText>.
    I build full-stack products and explore practical AI/ML applications.
  </>,

  <>
    Outside coursework, I enjoy turning ambiguous problems into thoughtful,
    useful software.
  </>,

  <>
    I'm mostly active on <HoverLink platform="Instagram" />,{" "}
    <HoverLink platform="LinkedIn" /> and{" "}
    <HoverLink platform="Medium" /> where I share everything.
  </>,
];
