import { useEffect, useState } from "react";
import { objByCategory } from "../util/dateTimeUtils";
import data from "../data.json";

export const Test = () => {
  //state
  const [flattenData, setFlattenData] = useState({});
  const [cartData, setCartData] = useState(false);

  // function to update the count state
  const incrementCartCout = (e,category, sub_category, itemId) => {
    e.stopPropagation();
    const tempData=flattenData;
    const categoryData = tempData[category];
    if (categoryData && categoryData[sub_category]) {
      const item = categoryData[sub_category].find(item => item.id === itemId);
      if (item) {
        item.count += 1;
      }
    }
    setFlattenData({...tempData})
  };
  useEffect(() => {
    setFlattenData(objByCategory(data));
  }, []);
  console.log(flattenData, "flattenData");

  return Object.entries(flattenData).map(([key, value]) => {
    return (
      <div key={key}>
        <h1>{key}</h1>
        {Object.entries(value).map(([sub_key, sub_value]) => {
          return (
            <ul key={sub_key}>
              <h2> {sub_key}</h2>
              {sub_value.map((sub_value_item) => {
                return (
                  <li
                    style={{
                      border: "1px solid blue",
                      height: "50px",
                      margin: "8px",
                      padding: "8px",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={sub_value_item.id}
                  >
                    <div>{sub_value_item.type}</div>
                    <button
                      onClick={(e) => {
                        incrementCartCout(e,key, sub_key, sub_value_item.id);
                      }}
                    >
                      +
                    </button>
                    <button>-</button>
                    <p>{sub_value_item.count}</p>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  });
};
