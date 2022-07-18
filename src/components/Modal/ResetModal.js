import React from "react";

export const ResetModal = ({ setShowModalReset = false,handleResetRequest, resetCall = 0, imei = "123456" }) => {
    const [resetWarnning, setResetWarnning] = React.useState(resetCall + 1)
    const [resetAll, setResetAll] = React.useState(false)

    console.log("______________________", resetWarnning)
    const handleReset = (state) => {
        setResetAll(state)
        setResetWarnning(resetWarnning + 1)
    }
    React.useEffect(() => {
        setResetWarnning(1)
    }, [])

    const call = () => {
        console.log("reset request placed+++++++++", resetAll)
        handleResetRequest(resetAll)
        setShowModalReset(false)
    }
    return <>
        <div
            style={{
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
                backgroundColor: "#0000005e",
            }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        // onClick={() => setShowModalReset(false)}
        >
            <div className="relative w-auto my-6 mx-auto max-w-sm" style={{maxWidth:500}}>
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Reset Confirmation
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModalReset(false)}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div
                        className="relative p-6 flex-auto"
                        style={{ padding: "20px" }}
                    >
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                            {resetWarnning === 1 ? `Are you sure you want to reset the target device? This will overwrite the old data on dashboard with
                            new One.`: resetWarnning === 2 ? `Do you want to reset app logic data as well?
                            `: `Are you sure you want to reset ${imei} device?
                            `}

                        </p>
                    </div>
                    {/*footer*/}
                    <div
                        style={{ padding: "20px" }}
                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
                    >
                        {resetWarnning === 1 ?
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModalReset(false)}
                            >
                                Cancel
                            </button> :

                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => resetWarnning === 2 ? handleReset(false) : setShowModalReset(false)}
                            >
                                {resetWarnning === 2 ? "No" : "Cancel"}
                            </button>}


                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => resetWarnning === 1 ? setResetWarnning(2) : resetWarnning === 3 ? call() : handleReset(true)}
                        >
                            {resetWarnning === 1 ? "Yes" : resetWarnning === 2 ? "Reset All" : "Yes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
}

