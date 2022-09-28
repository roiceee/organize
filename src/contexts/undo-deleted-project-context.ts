import React, { createContext } from "react";

interface UndoDeletedProjectContextInterface {
  undoDeletedProjectAlertState: boolean;
  setUndoDeletedProjectAlertState: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const UndoDeletedProjectContext =
  createContext<UndoDeletedProjectContextInterface>({
    undoDeletedProjectAlertState: false,
    setUndoDeletedProjectAlertState: () => {},
  });

export default UndoDeletedProjectContext;
