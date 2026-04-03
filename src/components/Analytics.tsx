'use client';

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useRef, useCallback } from 'react';

interface SectionData {
  id: string;
  label: string;
  timeSpent: number;
  visits: number;
}

interface AnalyticsData {
  totalVisitors: number;
  sections: SectionData[];
}

function getInitialAnalytics(sectionIds: string[], sectionLabels: string[], pageId: string): AnalyticsData {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 0,
      sections: sectionIds.map((id, i) => ({
        id,
        label: sectionLabels[i] || id,
        timeSpent: 0,
        visits: 0,
      })),
    };
  }
  const stored = localStorage.getItem(`analytics_${pageId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {
        totalVisitors: 0,
        sections: sectionIds.map((id, i) => ({
          id,
          label: sectionLabels[i] || id,
          timeSpent: 0,
          visits: 0,
        })),
      };
    }
  }
  return {
    totalVisitors: 0,
    sections: sectionIds.map((id, i) => ({
      id,
      label: sectionLabels[i] || id,
      timeSpent: 0,
      visits: 0,
    })),
  };
}

export function usePageAnalytics(sectionIds: string[], sectionLabels: string[], pageId: string) {
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => getInitialAnalytics(sectionIds, sectionLabels, pageId));
  const [isVisible, setIsVisible] = useState(false);
  const activeSectionRef = useRef<string | null>(null);
  const lastActiveTimeRef = useRef<number>(0);
  const hasInitializedRef = useRef(false);

  const persistAndUpdate = useCallback((updater: (prev: AnalyticsData) => AnalyticsData) => {
    setAnalytics(prev => {
      const updated = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`analytics_${pageId}`, JSON.stringify(updated));
      }
      return updated;
    });
  }, [pageId]);

  useEffect(() => {
    if (hasInitializedRef.current || typeof window === 'undefined') return;
    hasInitializedRef.current = true;

    const visitedKey = `visited_${pageId}`;
    if (!localStorage.getItem(visitedKey)) {
      localStorage.setItem(visitedKey, 'true');
      persistAndUpdate(prev => ({ ...prev, totalVisitors: prev.totalVisitors + 1 }));
    }
  }, [pageId, persistAndUpdate]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.hidden && activeSectionRef.current) {
        const elapsed = Date.now() - lastActiveTimeRef.current;
        if (elapsed > 0 && elapsed < 30000) {
          persistAndUpdate(prev => {
            const updated = { ...prev };
            const section = updated.sections.find(s => s.id === activeSectionRef.current);
            if (section) {
              section.timeSpent += elapsed;
            }
            return updated;
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [persistAndUpdate]);

  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (activeSectionRef.current) {
        const elapsed = now - lastActiveTimeRef.current;
        if (elapsed >= 30000) {
          activeSectionRef.current = null;
        }
      }
    };

    const interval = setInterval(checkIdle, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              const now = Date.now();

              if (activeSectionRef.current && activeSectionRef.current !== sectionId) {
                const elapsed = now - lastActiveTimeRef.current;
                if (elapsed > 0 && elapsed < 30000) {
                  persistAndUpdate(prev => {
                    const updated = { ...prev };
                    const sectionData = updated.sections.find(s => s.id === activeSectionRef.current);
                    if (sectionData) {
                      sectionData.timeSpent += elapsed;
                    }
                    return updated;
                  });
                }
              }

              persistAndUpdate(prev => {
                const updated = { ...prev };
                const sectionData = updated.sections.find(s => s.id === sectionId);
                if (sectionData && activeSectionRef.current !== sectionId) {
                  if (activeSectionRef.current === null) {
                    sectionData.visits += 1;
                  }
                }
                return updated;
              });

              activeSectionRef.current = sectionId;
              lastActiveTimeRef.current = now;
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, persistAndUpdate]);

  return { analytics };
}

export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function AnalyticsOverlay({
  analytics,
  isVisible,
  onClose,
  accentColor = '#00f5d4'
}: {
  analytics: AnalyticsData;
  isVisible: boolean;
  onClose: () => void;
  accentColor?: string;
}) {
  if (!isVisible) return null;

  const maxTime = Math.max(...analytics.sections.map(s => s.timeSpent), 1);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '380px',
      height: '100vh',
      background: 'rgba(10,10,15,0.98)',
      borderLeft: `1px solid ${accentColor}40`,
      zIndex: 2000,
      padding: '30px 25px',
      overflowY: 'auto',
      animation: 'slideIn 0.3s ease',
      boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
    }}>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.3rem', color: accentColor, margin: 0, fontWeight: 600 }}>
          Page Analytics
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5px',
            lineHeight: 1,
          }}
        >
          x
        </button>
      </div>

      <div style={{
        background: `${accentColor}15`,
        border: `1px solid ${accentColor}30`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '25px',
      }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Total Visitors
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: accentColor, fontFamily: 'JetBrains Mono, monospace' }}>
          {analytics.totalVisitors}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Attention Time by Section
        </h4>

        {analytics.sections.map((section, index) => {
          const percentage = (section.timeSpent / maxTime) * 100;
          const barColor = index % 4 === 0 ? accentColor :
                          index % 4 === 1 ? '#9b5de5' :
                          index % 4 === 2 ? '#f15bb5' : '#fee440';

          return (
            <div key={section.id} style={{ marginBottom: '18px', animation: `fadeIn 0.4s ease ${index * 0.05}s both` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: '#ccc', fontWeight: 500 }}>{section.label}</span>
                <span style={{ fontSize: '0.75rem', color: barColor, fontFamily: 'JetBrains Mono, monospace' }}>
                  {formatTime(section.timeSpent)}
                </span>
              </div>
              <div style={{
                height: '8px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  background: `linear-gradient(90deg, ${barColor}80, ${barColor})`,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '4px' }}>
                {section.visits} visits
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '15px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.06)',
        marginTop: '20px',
      }}>
        <p style={{ fontSize: '0.75rem', color: '#666', margin: 0, lineHeight: 1.6 }}>
          Idle time over 30 seconds is not counted as reading time. Data is stored locally in your browser.
        </p>
      </div>
    </div>
  );
}

export function AnalyticsButton({
  onClick,
  accentColor = '#00f5d4',
  visible = true
}: {
  onClick: () => void;
  accentColor?: string;
  visible?: boolean;
}) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      title="View Analytics"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: `${accentColor}20`,
        border: `1px solid ${accentColor}40`,
        color: accentColor,
        fontSize: '1.3rem',
        cursor: 'pointer',
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 20px ${accentColor}30`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = `0 6px 30px ${accentColor}50`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}30`;
      }}
    >
      Chart
    </button>
  );
}