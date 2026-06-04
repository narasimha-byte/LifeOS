'use client';

import React, { useState, ReactNode } from 'react';

interface AutomationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  devices?: number;
  savings?: string;
  savingsUnit?: string;
  status?: string;
  rainChance?: number;
  nextActiveTime?: string;
  featured?: boolean;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
}

export function AutomationCard({
  title,
  description,
  icon,
  isActive = true,
  onToggle,
  devices,
  savings,
  savingsUnit,
  status,
  rainChance,
  nextActiveTime,
  featured = false,
  backgroundColor = featured ? 'bg-surface-container-lowest' : 'bg-surface-container',
  accentColor = featured ? 'bg-primary' : 'bg-secondary',
  textColor = featured ? 'text-on-surface' : 'text-on-surface',
}: AutomationCardProps) {
  const [isToggled, setIsToggled] = useState(isActive);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle?.(newState);
  };

  return (
    <div
      className={`${backgroundColor} rounded-xl p-8 editorial-shadow flex flex-col justify-between min-h-[320px] relative overflow-hidden group transition-all hover:shadow-lg`}
    >
      {/* Gradient Background Effect */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 ${featured ? 'bg-primary-container/10' : 'bg-secondary/10'} rounded-full blur-3xl -mr-20 -mt-20 group-hover:${featured ? 'bg-primary-container/20' : 'bg-secondary/20'} transition-all duration-700`}
      ></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className={`w-12 h-12 rounded-lg ${accentColor}/10 flex items-center justify-center mb-4 text-${featured ? 'primary' : 'secondary'}`}>
            {icon}
          </div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h3>
          <p className="text-on-surface-variant text-base md:text-lg mt-2 max-w-md">
            {description}
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          className={`relative inline-flex items-center cursor-pointer h-8 w-14 rounded-full transition-colors ${
            isToggled ? `${accentColor}` : 'bg-surface-container-high'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          aria-label="Toggle automation"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isToggled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 mt-8 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Device Icons */}
        {devices && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center text-xs">
                💡
              </div>
              {devices > 1 && (
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center text-xs">
                  🌡️
                </div>
              )}
            </div>
            <span className="text-sm font-label text-on-surface-variant">
              Influences {devices} devices
            </span>
          </div>
        )}

        {/* Savings Badge */}
        {savings && (
          <div className="flex items-center gap-2 font-bold font-headline text-lg md:text-xl text-primary">
            ⚡ <span>{savings} {savingsUnit || ''}</span>
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <div className="pt-4 md:pt-0 md:ml-auto border-t md:border-t-0 md:border-l border-outline-variant/20 md:pl-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-secondary text-sm">☁️</span>
              <span className="text-xs font-medium">{rainChance}% Rain Chance</span>
            </div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              {status}
            </span>
          </div>
        )}

        {/* Next Active Time */}
        {nextActiveTime && (
          <div className="ml-auto text-right text-inverse-on-surface">
            <p className="text-inverse-on-surface text-xs uppercase tracking-widest mb-1">
              Next Active Cycle
            </p>
            <p className="font-headline text-lg font-semibold">{nextActiveTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}
