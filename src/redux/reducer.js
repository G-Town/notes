import { DSUM_NOTEBOOKS } from '../data/DSUMnotebooks';
import { DSUM_DOCS } from '../data/DSUMdocs';
import { MLUW_NOTEBOOKS } from '../data/MLUWnotebooks';
import { MLUW_DOCS } from '../data/MLUWdocs';
import { WDHK_MARKDOWN } from '../data/WDHKmarkdown';
import { WDHK_DOCS } from '../data/WDHKdocs';

export const initialState = {
    DSUMnotebooks: DSUM_NOTEBOOKS,
    DSUMdocs: DSUM_DOCS,
    MLUWnotebooks: MLUW_NOTEBOOKS,
    MLUWdocs: MLUW_DOCS,
    WDHKmarkdown: WDHK_MARKDOWN,
    WDHKdocs: WDHK_DOCS
};
export const Reducer = (state = initialState, action) => {
    return state;
};