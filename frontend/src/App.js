import React from 'react';
import { useFetchItemsQuery } from './store';
import { Stack , Button , Typography } from '@mui/material';
import Loader from './components/Loader';
import Message from './components/Message';
import ShowItems from './components/ShowItems';
import { BsCalendarPlus } from 'react-icons/bs';
import CreateItem from './components/CreateItem';
import { BiArrowBack } from 'react-icons/bi';


export default function App() {
    const [page , setPage] = React.useState(1);
    const [createItem , setCreateItem] = React.useState(false);

    const { data , isFetching , isError } = useFetchItemsQuery(page);
    
    const handlePrevious = (e) => {
        setPage(page-1);
    };

    const handleNext = (e) => {
        setPage(page+1);
    };

    const handleAdd = () => {
        setCreateItem(!createItem);
    };

    return (
        <Stack direction="row" sx={{
            display: 'flex',
        }}>
            {
                isFetching ? 
                <Loader color="success" /> :
                isError ?
                <Message severity="error"/> :
                <>
                
                <Stack direction="column" sx={{
                    marginInline: 'auto',
                    marginTop: '40px',
                    display:'flex',
                    justifyContent: 'center'
                }}>

                    {
                        !createItem ?
                        <Button sx={{
                            fontSize: '40px',
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            marginLeft: '5px',
                            cursor: 'pointer',
                            maxWidth: '50px',
                        }}
                        onClick={handleAdd}
                        >
                            <BsCalendarPlus />
                        </Button> :
                        <Button sx={{
                            fontSize: '40px',
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            marginLeft: '5px',
                            cursor: 'pointer',
                            maxWidth: '50px',
                        }}
                        onClick={handleAdd}
                        >
                            <BiArrowBack />
                        </Button>
                    }
                    <Typography m='auto' mb={2} variant="h3">Todo List</Typography>
                    {
                    createItem ? 
                    <CreateItem />
                    :
                    <>
                    <Stack direction="column" sx={{
                        marginBottom: '5px'
                    }}>
                        <ShowItems items={data.results} />
                    </Stack>
                    <Stack direction="row" sx={{
                        marginInline: 'auto',
                        marginTop: '10px',
                    }}>
                        <Button onClick={handlePrevious} disabled={data.previous === null} variant='contained' color='info'>prev</Button>
                        <Typography component="span" variant="h4" sx={{
                            marginInline: '8px',
                            color: 'black',
                            fontWeight: 'bold',
                        }}>{page}</Typography>
                        <Button onClick={handleNext} disabled={data.next === null} variant='contained' color='info'>next</Button>
                    </Stack>
                    </>
                    }
                </Stack>
                </>
            }
        </Stack>
    )
}

