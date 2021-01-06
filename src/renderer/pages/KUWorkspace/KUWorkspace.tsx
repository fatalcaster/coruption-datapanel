import React, { useState } from "react";
import { AddContainer } from "../../components/AddContainer/AddContainer";
import { KUTable } from "../../components/KUTable/KUTable";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./style.css";

interface KUWorkspaceProps {}

export const KUWorkspace: React.FC<KUWorkspaceProps> = ({}) => {
    const [formVisibility, setFormVisibility] = useState(false);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.navContainer}>
                <NavBar
                    events={[
                        () => {
                            setFormVisibility(true);
                        },
                    ]}
                />
            </div>
            <div className={`${styles.restContainer} REST`}>
                <KUTable />
            </div>
            {formVisibility ? (
                <AddContainer
                    onClose={() => {
                        setFormVisibility(false);
                    }}
                />
            ) : null}
        </div>
    );
};
