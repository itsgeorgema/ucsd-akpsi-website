"use client";

export default function ScrollArrow() {
  return (
    <div className="animate-bounce">
      <button
        onClick={() => {
          // Try to find the modal card section first
          const modalCard = document.querySelector('[data-modal-card]');
          if (modalCard) {
            modalCard.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Fallback to any section after hero
            const sections = document.querySelectorAll('section');
            if (sections.length > 1) {
              sections[1].scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        aria-label="Scroll down"
        className="focus:outline-none cursor-pointer"
      >
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
} 