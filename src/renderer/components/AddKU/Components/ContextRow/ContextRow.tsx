import React, { useCallback, useEffect, useRef } from "react";
import styles from "./style.css";
interface ContextRowProps {
    id: string;
    title: string;
    color: string;
    fontSize?: string;
    onClick:
        | ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
        | undefined;
    onClickOutside:
        | ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
        | undefined;
}

export const ContextRow: React.FC<ContextRowProps> = ({
    id,
    title,
    color,
    fontSize,
    onClick,
    onClickOutside,
}) => {
    const menuRef = useRef<HTMLButtonElement>(null);
    const eventListener = useCallback((event) => {
        if (!menuRef.current?.contains(event.target as Node)) {
            if (onClickOutside) onClickOutside();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", eventListener);
        return () => document.removeEventListener("mousedown", eventListener);
    }, []);

    return (
        <button
            id={id}
            ref={menuRef}
            onClick={() => {
                if (onClick) onClick();
            }}
            style={{ backgroundColor: color, fontSize: fontSize }}
            className={styles.menu}
        >
            {title}
        </button>
    );
};
