import React, { useEffect, useState } from "react";

function Form(props) {
  const [form, setForm] = useState({});
  const [dataBase, setDataBase] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //    const data = await responce.text();
    const data = await responce.json();

    console.log(data);
    // console.log(form);
    console.log(responce);
  };

  const getData = async () => {
    const finalResponce = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });

    const fData = await finalResponce.json();
    setDataBase(fData);

    console.log(fData);
  };

  return (
    <>
      {/* form is a json file so convert it to string by JSON.stringify */}
      <p>{JSON.stringify(form)}</p>

      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">username : </label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">password : </label>
          <input type="text" name="password" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {dataBase.map((items) => {
          return (
            <>
              <li key={items._id}>
                {items.username}, {items.password}
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default Form;
