export const focusManagement = {
  setFocusToElement: (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  },

  setFocusToFirstFocusableElement: (container: HTMLElement | null) => {
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  },

  trapFocusInModal: (modalElement: HTMLElement, event: KeyboardEvent) => {
    const focusableElements = modalElement.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  },
};

export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const formatDateForScreenReader = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateSkipLink = (targetId: string, text: string = 'Skip to main content') => {
  return {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50',
    children: text,
  };
};

export const getHeadingLevel = (level: number): string => {
  const validLevels = [1, 2, 3, 4, 5, 6];
  if (!validLevels.includes(level)) {
    console.warn(`Invalid heading level: ${level}. Using h2 as default.`);
    return 'h2';
  }
  return `h${level}`;
};

export const createAriaDescribedBy = (id: string, description: string) => {
  const descriptionElement = document.createElement('div');
  descriptionElement.id = id;
  descriptionElement.className = 'sr-only';
  descriptionElement.textContent = description;
  
  document.body.appendChild(descriptionElement);
  
  return {
    'aria-describedby': id,
    cleanup: () => {
      const element = document.getElementById(id);
      if (element) {
        document.body.removeChild(element);
      }
    },
  };
};