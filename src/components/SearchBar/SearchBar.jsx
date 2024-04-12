import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

function SearchBar  ({onSearch}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.search.value.trim();
     if (!topic) {
      toast.error('You should add your query. What images would you like to see? ')
       return;
     }
    
    onSearch(topic);
   
    form.reset();
    }

    return (
  <form className={css.searchBarForm}  onSubmit={handleSubmit}>
    <input className={css.searchBarInput} name='search'
      type="text"
      autoComplete="off"
      autoFocus
            placeholder="Search images and photos"
    />
    <button type="submit" className={css.searchBarButton}>Search</button>
  </form>

    )
}
export default SearchBar;

