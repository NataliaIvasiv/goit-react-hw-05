import css from './LoadMoreBtn.module.css'
const LoadMoreBtn = ({ onLoadMore }) => {
    
   
    return (
        <div>
            <button className={css.loadMoreBtn} type="click" onClick={onLoadMore}>Load more</button>
        </div>
    )
}
export default LoadMoreBtn;