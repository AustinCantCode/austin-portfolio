"use client";

import React from "react";
import { Timeline, TimelineItem } from "./timeline";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "destructive";

export interface TimelineElement {
  id: number;
  startDate: string;
  endDate?: string;
  title: string;
  subtext?: string;
  description: string;
  icon?: ReactNode | (() => ReactNode);
  color?: TimelineColor;
  size?: TimelineSize;
  loading?: boolean;
  error?: string;
}

export interface TimelineProps {
  items: TimelineElement[];
  size?: TimelineSize;
  animate?: boolean;
  iconColor?: TimelineColor;
  connectorColor?: TimelineColor;
  className?: string;
}

interface TimelineLayoutProps {
  items: TimelineElement[];
  size?: "sm" | "md" | "lg";
  iconColor?: "primary" | "secondary" | "muted" | "accent";
  customIcon?: React.ReactNode;
  animate?: boolean;
  connectorColor?: "primary" | "secondary" | "muted" | "accent";
  className?: string;
}

export const TimelineLayout = ({
  items,
  size = "md",
  iconColor,
  customIcon,
  animate = true,
  connectorColor,
  className,
}: TimelineLayoutProps) => {
  return (
    <Timeline size={size} className={className}>
      {[...items].map((item, index) => (
        <motion.div
          key={index}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          <TimelineItem
            startDate={item.startDate}
            endDate={item.endDate}
            title={item.title}
            subtext={item.subtext}
            description={item.description}
            icon={
              typeof item.icon === "function"
                ? item.icon()
                : item.icon || customIcon
            }
            iconColor={"muted"}
            connectorColor={item.color || connectorColor}
            showConnector={index !== items.length - 1}
          />
        </motion.div>
      ))}
    </Timeline>
  );
};
