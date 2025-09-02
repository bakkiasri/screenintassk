import { useEffect } from "react";
import { useState } from "react";

function New() {
  const [firstname, Setfname] = useState("");
  const [lasttname, Setlname] = useState("");
  const [pno, Setpno] = useState("");
  const [email, Setemail] = useState("");

  const HandleSummit = (e) => {
    e.preventDefault();
    // const { firstname, value } = e.target;
    // Setfname(firstname);
    console.log("submitted");
    console.log(firstname);
    console.log(lasttname);
    console.log(pno);
    console.log(email);
  };
  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={HandleSummit}
        className="flex-row justify-center space-y-3 border-1 p-4 shadow-lg items-center w-70"
      >
        <div className="flex-row justify-center">
          <div>Firstname</div>
          <input
            type="text"
            value={firstname}
            onChange={(e) => Setfname(e.target.value)}
            className="bg-white py-2 hover:focus-ring-none rounded-lg shadow "
          />
        </div>
        <div className="flex-row">
          <div>lastname </div>
          <input
            type="text"
            value={lasttname}
            onChange={(e) => Setlname(e.target.value)}
            className="bg-white py-2 hover:focus-ring-none rounded-lg shadow "
          />
        </div>
        <div className="flex-row">
          <div>Phone number</div>
          <input
            type="text"
            value={pno}
            onChange={(e) => Setpno(e.target.value)}
            className="bg-white py-2 hover:focus-ring-none rounded-lg shadow "
          />
        </div>
        <div className="flex-row">
          <div>email</div>
          <input
            type="text"
            value={email}
            onChange={(e) => Setemail(e.target.value)}
            className="bg-white py-2 hover:focus-ring-none rounded-lg shadow "
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-300 p-3 text-center rounded-lg cursor-pointer"
          >
            Summbit
          </button>
        </div>
      </form>
    </div>
  );
}
export default New;
