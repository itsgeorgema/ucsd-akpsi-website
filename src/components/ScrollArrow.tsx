"use client";

export default function ScrollArrow() {
  return (
    <div className="animate-bounce">
      <button
        onClick={() => {
          const section = document.getElementById('akpsi-info');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll down"
        className="focus:outline-none"
      >
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
} 