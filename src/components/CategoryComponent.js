import React from "react"

export default function CategoryComponent(props) {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        async function getCategory() {
            const res = await fetch('https://opentdb.com/api_category.php')
            const data = await res.json()
            setCategories(data.trivia_categories)
        }
        getCategory()
    }, [])

    function categoriesRender() {
        return categories.map((category) => (
                <option value={`category=${category.id}`}>{category.name}</option>
            )
        );
    }

    return (
        <div className='option-wrapper'>
            <label htmlFor='category'>Choose quiz category</label>
            <select 
                value={props.value} 
                onChange={props.onChange} 
                id='category'   
                className='category options'
            >
                <option value=''>Any category</option>
                {categoriesRender()}
            </select>
        </div>
    );
}


