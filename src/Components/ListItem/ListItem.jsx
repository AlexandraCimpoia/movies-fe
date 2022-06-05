import './ListItem.scss';

const ListItem = ({poster, onClick, id}) => {
    return (
        <div className="item">
            <img src={poster} onClick={() => onClick(id)}/>
        </div>
    );
}

export default ListItem;