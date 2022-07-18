import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getContacts } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import { sortById,sortByKey } from "utils/sorting";
import { sortByDate } from "utils/sorting";


const Contacts = ({ imei,setLoaded }) => {
  const [contacts, setContacts] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const hover = (e, key) => {
    e.preventDefault();
    let contactRow = document.getElementById(`contactRow${key}`);

    contactRow.style.backgroundColor =
      contactRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  React.useEffect(() => {
    if (contacts.length < 1)
    setLoading(true)
      getContacts({ imei, skip: 0 }, (data) => {
        setContacts(data);
        setFilteredData(data)
        setLoading(false)
        setLoaded(p=>({...p,t2:true}))
      });
    console.log(`%c CallLogs Render for ${imei}`, "color: red");
  }, [imei, getContacts]);

  const handleFilter = (value) => {
  
    const newData = contacts.filter(
      (log) =>
        log.uid.toLowerCase().includes(value.toLowerCase()) ||
        log.recordDate.toLowerCase().includes(value.toLowerCase()) ||
        log.name.toLowerCase().includes(value.toLowerCase()) ||
        log.number.toLowerCase().includes(value.toLowerCase()) 
        
    );
    setFilteredData(newData);
  };


  const getContact = () => {
    getContacts({ imei, skip: contacts.length }, (data) => {
      setContacts((prevContacts) => [...prevContacts, ...data]);
    setFilteredData((prevContacts) => [...prevContacts, ...data])
      
    });
  };
  return (
    <BottomScrollListener onBottom={getContact}>
      {(scrollRef) => (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
          }
          style={{ height: 535, overflowY: "scroll" }}
          ref={scrollRef}
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              
                <h3
                    className={"font-semibold text-lg text-blueGray-700"}
                    style={{ float: "left" }}
                  >
                     Contacts
                  </h3>

                  <div
                    className="relative flex w-full flex-wrap items-stretch"
                    style={{ float: "right", width: 300 }}
                  >
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      onChange={(ev) => handleFilter(ev.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    />
                  </div>
              </div>
            </div>
          </div>
          <div className="block w-full "></div>

          {!loading&&contacts ? (contacts.length<1?<h2 style={{textAlign:"center"}}>Nothing Synced</h2>:
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                    onClick={() => {
                      const sortedData = sortById(contacts, sorting);
                      setFilteredData(sortedData);
                      setSorting(!sorting);
                    }}
                    style={{cursor:"pointer"}}

                  >
                    ID <i class="fas fa-sort"></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                    style={{cursor:"pointer"}}
                    onClick={()=>{
                     const sortedData= sortByDate(contacts,sorting,"recordDate")
                     setFilteredData(sortedData)
                     setSorting(!sorting)
                    }}
                    >
                      Date <i class="fas fa-sort"></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }

                    onClick={() => {
                      const sortedData = sortByKey(
                        contacts,
                        sorting,
                        "number"
                      );
                      setFilteredData(sortedData);
                      setSorting(!sorting);
                    }}
                    style={{cursor:"pointer"}}

                  >
                    Contacts <i class="fas fa-sort"></i>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((contact, key) => {
                  return (
                    <tr
                      id={`contactRow${key.toString()}`}
                      key={key.toString()}
                      onMouseEnter={(e) => hover(e, key.toString())}
                      onMouseLeave={(e) => hover(e, key.toString())}
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {contact.uid}
                          </span>
                        </div>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={
                              "w-full ml-3 font-bold text-blueGray-600"
                            }
                          >
                            {getLocalDate(contact.recordDate)}
                          </span>
                          <span className={"w-full ml-3 text-blueGray-600"}>
                            {contact.triggerName}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={
                              "w-full ml-3 font-bold text-blueGray-600"
                            }
                          >
                            {contact.name}
                          </span>
                          <span className={"w-full ml-3 text-blueGray-600"}>
                            {contact.number}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PuffLoader />
            </div>
          )}
        </div>
      )}
    </BottomScrollListener>
  );
};

export default Contacts;
