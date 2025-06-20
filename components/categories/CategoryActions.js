import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react'; // Add missing import for useState
import { deleteCategory, updateCategory } from '../../utils/data/categoryData';

function CategoryActions({ categoryId, categoryLabel, onCategoryUpdated, onCategoryDeleted }) {
  const [newLabel, setNewLabel] = useState(categoryLabel);
  const router = useRouter();

  const handleUpdate = async () => {
    if (newLabel.trim() === '') return;

    try {
      const updatedCategory = await updateCategory({ label: newLabel }, categoryId);
      if (onCategoryUpdated) onCategoryUpdated(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);
      if (onCategoryDeleted) onCategoryDeleted(categoryId);
      router.push('/categories'); // Redirect to categories page
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Edit category label" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <button type="button" onClick={handleUpdate} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Update
      </button>
      <button type="button" onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
}

CategoryActions.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  onCategoryUpdated: PropTypes.func,
  onCategoryDeleted: PropTypes.func,
};

CategoryActions.defaultProps = {
  onCategoryUpdated: null,
  onCategoryDeleted: null,
};

export default CategoryActions;
