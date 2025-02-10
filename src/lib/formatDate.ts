// src/lib/formatDate.ts
export function formatFriendlyDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Reset time part for accurate day comparisons
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = nowDay.getTime() - dateDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Today
    if (diffDays === 0) {
      return 'Today';
    }
    
    // Yesterday
    if (diffDays === 1) {
      return 'Yesterday';
    }
    
    // Within a week
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    
    // Within 2 weeks
    if (diffDays < 14) {
      return 'Last week';
    }
    
    // Within 5 weeks
    if (diffDays < 35) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    
    // Within a year
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    
    // More than a year
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }