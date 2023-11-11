export const objByCategory=(data)=>{
    const result = {};
    data.map((item) => {
      if (!result[item.category]) {
        result[item.category] = {};
      }
      if (result[item.category][item.sub_category]) {
        result[item.category][item.sub_category].push({...item,count:0});
      } else {
        result[item.category][item.sub_category] = [{...item,count:0}];
      }
    });
    return result;
}