import { DSUM_NOTEBOOKS } from '../data/DSUMnotebooks';
import { MLUW_NOTEBOOKS } from '../data/MLUWnotebooks';
import { WDHK_PAGES } from '../data/WDHKpages';

export const initialState = {
    DSUMnotebooks: DSUM_NOTEBOOKS,
    MLUWnotebooks: MLUW_NOTEBOOKS,
    WDHKpages: WDHK_PAGES
};
export const Reducer = (state = initialState, action) => {
    return state;
};