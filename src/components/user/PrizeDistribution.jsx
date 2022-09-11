import DataItem from "../ui/DataItem";


const PrizeDistribution = (props) => {
  const { price } = props;

  return (<>
  <h2 className="mt-6">Prize Distribution</h2>
  <div className="d-grid grid-md-2 grid-xl-4 mt-3 gap-2">
    <DataItem heading="Percentile >90" value={`₹ ${Math.floor(price * 2.2)}`} />
    <DataItem heading="Percentile 76 - 90" value={`₹ ${Math.floor(price * 1.46)}`} />
    <DataItem heading="Percentile 51 - 75" value={`₹ ${Math.floor(price * 0.88)}`} />
    <DataItem heading="Percentile <50" value={`₹ 0`} />
  </div>
  </>);
}

export default PrizeDistribution;