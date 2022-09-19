import { useEffect, useRef, useCallback } from "react";
import styles from "../../styles/modules/scroll-top-button.module.scss";
import transitionStyles from "../../styles/modules/transitions.module.scss";

function ScrollToTopButton() {
  const scrollButtonRef = useRef<HTMLButtonElement>(null);

  const scrollFunction = useCallback(() => {
    const scrollButton = scrollButtonRef.current;
    if (scrollButton === null) {
      return;
    }
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      scrollButton.style.display = "block";
      scrollButton.classList.add(transitionStyles.fadeInScrollButton);
    } else {
      scrollButton.style.display = "none";
    }
  }, []);

  // When the user clicks on the button, scroll to the top of the document
  const scrollToTop = useCallback(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      scrollFunction();
    };
  }, [scrollFunction]);
  return (
    <button
      ref={scrollButtonRef}
      className={`${styles.buttonStyle} rounded-circle`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
      </svg>
    </button>
  );
}

export default ScrollToTopButton;
