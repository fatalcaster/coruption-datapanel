import {
    faFileExcel,
    faFilter,
    faPlus,
    faPrint,
    faSearch,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./style.css";

interface NavBarProps {
    events: (
        | ((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void)
        | undefined
    )[];
}

export const NavBar: React.FC<NavBarProps> = ({ events }) => {
    //const [];

    return (
        <nav className={styles.navBar}>
            <ul className={styles.navBarList}>
                <FontAwesomeIcon
                    icon={faPlus}
                    className={styles.navItem}
                    size="lg"
                    onClick={events[0]}
                />
                <FontAwesomeIcon
                    icon={faFilter}
                    className={styles.navItem}
                    size="lg"
                    onClick={events[1]}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className={styles.navItem}
                    size="lg"
                    onClick={events[2]}
                />
            </ul>
        </nav>
    );
};
