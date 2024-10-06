import { useView } from "@/hooks/useView";
import { createContext } from "react";

type IStateContext = ReturnType<typeof useView>;

export const StateContext = createContext<IStateContext | null>( null );