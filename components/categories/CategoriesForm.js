import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createCategory } from '../../utils/data/categoryData';

function CategoriesForm({ onCategoryCreated }) {
  const [name, setName] = useState('');
  const router = useRouter(); // Add useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') return;

    try {
      const newCategory = await createCategory({ label: name }); // Send `label` instead of `name`
      setName('');
      if (onCategoryCreated) onCategoryCreated(newCategory);
      router.push('/categories'); // Redirect to categories page
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="categoryName" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Category Name
        </label>
        <input id="categoryName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      </div>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Create Category
      </button>
    </form>
  );
}

CategoriesForm.propTypes = {
  onCategoryCreated: PropTypes.func,
};

CategoriesForm.defaultProps = {
  onCategoryCreated: null,
};

export default CategoriesForm;
