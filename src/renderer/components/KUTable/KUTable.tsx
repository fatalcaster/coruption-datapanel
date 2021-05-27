import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { KUData } from "../../../main/Helpers/DataTypes";
import { KUDisplayData } from "../../../main/Helpers/Utils";
import { ContextRow } from "../AddKU/Components/ContextRow/ContextRow";
import styles from "./style.css";

interface KUTableRowProps {
    setUpEdit: (newData: KUData) => void;
}

export const KUTable: React.FC<KUTableRowProps> = ({ setUpEdit }) => {
    const [data, setData] = useState<KUDisplayData[]>(
        ipcRenderer.sendSync("ku-display-request", { return: true })
    );

    ipcRenderer.on("update-ku-display", function (event, message) {
        setData(message);
    });

    const [editingRow, setEditingRow] = useState<number | undefined>(undefined);

    const setEditContext = (index: number) => {
        setEditingRow(index);
    };
    const unsetEditContext = () => {
        setEditingRow(undefined);
    };

    return (
        <table className={styles.contentTable}>
            <thead>
                <tr>
                    <th>
                        Редни
                        <br />
                        број
                    </th>
                    <th>
                        КУ
                        <br />
                        Број
                    </th>
                    <th>
                        Датум
                        <br />
                        пријаве
                    </th>
                    <th>
                        Достављено
                        <br />
                        ВЈТ
                    </th>
                    <th>Пријављени</th>
                    <th>
                        Кривично <br />
                        дело (члан)
                    </th>
                    <th>
                        Задужен <br />
                        радник
                    </th>
                    <th>
                        Достављено <br />
                        СКА
                    </th>
                </tr>
            </thead>
            <tbody>
                {data
                    ? data.map((value: any, index: number) => {
                          return editingRow != index ? (
                              <tr
                                  key={`${name}-row-${index}`}
                                  onContextMenu={() => {
                                      setEditContext(index);
                                  }}
                              >
                                  <th>{index + 1}</th>
                                  {typeof value !== "string" ? (
                                      Object.keys(value).map(
                                          (keyname: any, colIndex: number) => {
                                              return (
                                                  <th
                                                      key={`${name}-row-data-${colIndex}`}
                                                  >
                                                      {typeof value[keyname] ===
                                                      "boolean" ? (
                                                          value[keyname] ? (
                                                              "Да"
                                                          ) : (
                                                              "Не"
                                                          )
                                                      ) : Array.isArray(
                                                            value[keyname]
                                                        ) ? (
                                                          <ul
                                                              key={`ul-${name}-row-data-${colIndex}`}
                                                          >
                                                              {Object.keys(
                                                                  value[keyname]
                                                              ).map(
                                                                  (
                                                                      key: any,
                                                                      colIndex: number
                                                                  ) => {
                                                                      return (
                                                                          <li
                                                                              key={`li-${colIndex}-${key}-${keyname}`}
                                                                          >
                                                                              {
                                                                                  value[
                                                                                      keyname
                                                                                  ][
                                                                                      key
                                                                                  ]
                                                                              }
                                                                          </li>
                                                                      );
                                                                  }
                                                              )}
                                                          </ul>
                                                      ) : (
                                                          value[keyname]
                                                      )}
                                                  </th>
                                              );
                                          }
                                      )
                                  ) : (
                                      <td
                                          key={`${name}-row-${index}-data-${index}`}
                                      >
                                          {value}
                                      </td>
                                  )}
                              </tr>
                          ) : (
                              <tr key={index}>
                                  <td colSpan={8}>
                                      <ContextRow
                                          id={`${name}-remove-row-${index}`}
                                          key={index}
                                          title={"Измени"}
                                          color={"#949494"}
                                          fontSize={"2em"}
                                          onClick={() => {
                                              const p: KUData =
                                                  ipcRenderer.sendSync(
                                                      "get-ku-edit",
                                                      data[index].ku_number
                                                  );

                                              setUpEdit(p);
                                          }}
                                          onClickOutside={() => {
                                              unsetEditContext();
                                          }}
                                      />
                                  </td>
                              </tr>
                          );
                      })
                    : undefined}
            </tbody>
        </table>
    );
};
