import React from "react";

function AllServices() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user.role === "admin" && <div>1</div>}
      {(user.role === "user" || user.role === "staff") && <div>2</div>}
    </div>
  );
}

export default AllServices;
