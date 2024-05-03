import React, { useState, useEffect } from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Змінюємо видимість повідомлення через 2 секунди
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isVisible && (
        <div className={styles.errorMessage}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
