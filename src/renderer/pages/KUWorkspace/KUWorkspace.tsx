import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { KUData } from "../../../main/Helpers/DataTypes";
import { AddContainer } from "../../components/AddKU/AddContainer/AddContainer";
import { KUFilterContainer } from "../../components/FilterKU/KUFilterContainer/KUFilterContainer";
import { KUTable } from "../../components/KUTable/KUTable";
import { NavBar } from "../../components/NavBar/NavBar";
import { KUSearchContainer } from "../../components/SearchKU/KUSearchContainer/KUSearchContainer";
import styles from "./style.css";

interface KUWorkspaceProps {}

export const KUWorkspace: React.FC<KUWorkspaceProps> = ({}) => {
    const [formVisibility, setFormVisibility] = useState(false);

    const [filterVisibility, setFilterVisibility] = useState(false);

    const [searchVisibility, setSearchVisibility] = useState(false);

    const [dataToEdit, setDataToEdit] = useState<KUData | undefined>();

    const setUpEditScreen = (newData: KUData) => {
        setFilterVisibility(false);
        setSearchVisibility(false);
        setDataToEdit(newData);
        setFormVisibility(true);
        ipcRenderer.send("ku-display-request", { return: false });
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.navContainer}>
                <NavBar
                    events={[
                        () => {
                            if (!filterVisibility && !searchVisibility)
                                setFormVisibility(true);
                        },
                        () => {
                            if (!formVisibility && !searchVisibility)
                                setFilterVisibility(true);
                        },
                        () => {
                            if (!formVisibility && !filterVisibility)
                                setSearchVisibility(true);
                        },
                    ]}
                />
            </div>
            <div className={`${styles.restContainer} REST`}>
                <KUTable setUpEdit={setUpEditScreen} />
            </div>
            {formVisibility ? (
                <AddContainer
                    data={dataToEdit}
                    onClose={() => {
                        setFormVisibility(false);
                        setDataToEdit(undefined);
                    }}
                />
            ) : null}

            {filterVisibility ? (
                <KUFilterContainer
                    onClose={() => {
                        setFilterVisibility(false);
                    }}
                />
            ) : null}
            {searchVisibility ? (
                <KUSearchContainer
                    onClose={() => {
                        setSearchVisibility(false);
                    }}
                />
            ) : null}
        </div>
    );
};
