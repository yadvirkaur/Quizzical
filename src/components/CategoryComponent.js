import React from 'react'
import PropTypes from 'prop-types'

export default function CategoryComponent({ value, onChange }) {
  const [categories, setCategories] = React.useState([])

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
      <option key={category.id} value={`category=${category.id}`}>
        {category.name}
      </option>
    ))
  }

  return (
    <div className="option-wrapper">
      <label htmlFor="category">
        Choose quiz category
        <select
          value={value}
          onChange={onChange}
          id="category"
          className="category options"
        >
          <option value="">Any category</option>
          {categoriesRender()}
        </select>
      </label>
    </div>
  )
}

CategoryComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
