
 export const sortById = (data,sorting) => {
    const sortData = data.sort((a, b) => {
      // console.log(a.uid);
      let auid = a.uid.split(":")[0];
      let buid = b.uid.split(":")[0];

      if (sorting) return auid - buid;
      return buid - auid;
    });
    // setData(sortData);
    return sortData;
  };


 export const sortByKey = (data,sorting,key) => {
    const sortData = data.sort((a, b) => {
      // console.log(a.uid);
      let adata = a[key];
      let bdata = b[key];

      if (sorting) return adata.localeCompare(bdata);
      return bdata.localeCompare(adata);
    });
    // setData(sortData);
    return sortData;
  };

  export const sortByDate = (data,sorting,key) => {
    const sortData = data.sort((a, b) => {
    //  console.log("---",a[key])
      if (new Date(a[key]) < new Date(b[key])) {
        return sorting ? 1 : -1;
      }
      if (new Date(a[key]) > new Date(b[key])) {
        return sorting ? -1 : 1;
      }
      return 0;
    });
    return sortData
  };