import { useHits } from "react-instantsearch";
import Result from './Result';
import { Grid } from '@mui/material'

export default function ResultsMap({hit, currentList, categories, stages}){
    const { hits, results, sendEvent } = useHits({hit});

    return (
       hits && hits.map((hit) => (
            <Grid item xs={12} sm={6} key={hit.objectID}>
                <Result currentList={currentList} categories={categories} stage={stages} hit={hit} />
            </Grid>
            ))
    )
}