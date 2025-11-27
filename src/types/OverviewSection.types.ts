import React from 'react';

export interface CardItem {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number; 
    iconBgColor?: string;
}

export type OverviewSectionProps = {
    cards: CardItem[]; 
    lastUpdated?: string;
    title?: string; 
};