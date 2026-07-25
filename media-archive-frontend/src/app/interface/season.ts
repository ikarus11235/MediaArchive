import { Episode } from "./episode";

export interface Season {
    id: number;
    headerId: number;
    title: string;
    episodes: Episode[] | null;
}
