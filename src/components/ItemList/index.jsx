const ItemList = ({ data, renderItem, className }) => {
  return (
    <div className={className}>{data.map((item) => renderItem(item))}</div>
  );
};

export default ItemList;
