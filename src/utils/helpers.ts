export const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Success is not final, failure is not fatal. - Winston Churchill",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
];

export const getRandomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const calculateProductivityScore = (data: {
  tasksCompleted: number;
  habitsCompleted: number;
  focusTime: number;
  goalsProgress: number;
}): number => {
  const { tasksCompleted, habitsCompleted, focusTime, goalsProgress } = data;
  
  let score = 0;
  
  // Tasks: up to 25 points
  score += Math.min(tasksCompleted * 2.5, 25);
  
  // Habits: up to 25 points
  score += Math.min(habitsCompleted * 2.5, 25);
  
  // Focus time: up to 25 points
  score += Math.min((focusTime / 60) * 2.5, 25);
  
  // Goals progress: up to 25 points
  score += goalsProgress / 4;
  
  return Math.min(score, 100);
};
