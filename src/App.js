import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";

const categories = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
]

function App() {
    const [collections, setCollections] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        const categoryParam = categoryId ? `category=${categoryId}` : ''

        fetch(`https://65df33d0ff5e305f32a1b839.mockapi.io/photosAPI?page=${page}&limit=3&${categoryParam}`)
            .then(res => res.json())
            .then(json => setCollections(json))
            .catch(err => {
                console.warn(err)
                alert('Не удалось получить фотографии')
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page])
    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj, index) => (
                        <li
                            onClick={() => setCategoryId(index)}
                            className={categoryId === index ? 'active' : ''}
                            key={obj.name}>
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input"
                       placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {isLoading ? <h2>Идет загрузка...</h2> : collections
                    .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((obj, index) => (
                        <Collection
                            key={index}
                            name={obj.name}
                            images={[
                                'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                                'https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                                'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                                'https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                            ]}
                        />
                    ))}
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, i) => (
                        <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
