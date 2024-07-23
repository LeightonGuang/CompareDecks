const CompareCard = ({ imgUrl, name }: { imgUrl: string; name: string }) => {
  return (
    <div>
      <button>pin</button>
      <img src={imgUrl} alt="img" />
      <p>{name}</p>
    </div>
  );
};

export default CompareCard;
