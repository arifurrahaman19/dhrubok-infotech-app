import axios from "axios";
import { useEffect, useState } from "react";
import { findUsers, isUserExist, paginatedData, sortedBy } from "../utils";

axios.defaults.baseURL = "http://localhost:5000";

const List = () => {
  const [state, setState] = useState({
    users: [],
    usersForDataTable: [],
    searchQuery: "",
    isFetchedJSONData: false,
    sortedBy: "",
  });

  const [paginationConfig, setPaginationConfig] = useState({
    numberOfUsers: undefined,
    usersPerPage: 20,
    numberOfPages: 0,
    activePage: 1,
  });

  useEffect(() => {
    axios.get("/users").then(({ data }) => {
      setState({
        ...state,
        users: data,
        usersForDataTable: data,
        isFetchedJSONData: true,
      });
    });
  }, []);

  useEffect(() => {
    async function fetchDataFromAPI() {
      if (state.isFetchedJSONData) {
        axios.get(`https://randomuser.me/api/?results=20`).then(({ data }) => {
          if (data.results) {
            let newUsers = [];
            data.results.forEach((user) => {
              if (!isUserExist(state.users, user.email)) {
                let newUser = {
                  name: `${user.name.first} ${user.name.last}`,
                  email: user.email,
                  gender: user.gender,
                  phone: user.phone,
                };
                newUsers.push(newUser);

                axios
                  .post("/users", newUser)
                  .then((res) => {})
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });

            setState({
              ...state,
              usersForDataTable: [...state.usersForDataTable, ...newUsers],
            });
          }
        });
      }
    }

    fetchDataFromAPI();
  }, [state.isFetchedJSONData]);

  useEffect(() => {
    if (state.users) {
      setPaginationConfig({
        ...paginationConfig,
        numberOfUsers: state.usersForDataTable.length,
        numberOfPages: Math.ceil(
          state.usersForDataTable.length / paginationConfig.usersPerPage
        ),
        activePage: 1,
      });
    }
  }, [state.usersForDataTable, paginationConfig.usersPerPage]);

  useEffect(() => {
    if (state.searchQuery.trim()) {
      setState({
        ...state,
        usersForDataTable: findUsers(state.users, state.searchQuery),
      });
    } else {
      setState({
        ...state,
        usersForDataTable: state.users,
      });
    }
  }, [state.searchQuery]);

  useEffect(() => {
    if (state.sortedBy) {
      setState({
        ...state,
        usersForDataTable: sortedBy(state.usersForDataTable, state.sortedBy),
      });
    }
  }, [state.sortedBy]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="user-list">
      <div className="user-search">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search User"
          onChange={inputHandler}
        />
      </div>
      <div className="data-tabel">
        <div className="user-list__header">
          <h4 onClick={() => setState({ ...state, sortedBy: "name" })}>Name</h4>
          <h4
            onClick={() => setState({ ...state, sortedBy: "email" })}
            className="email"
          >
            Email
          </h4>
          <h4 onClick={() => setState({ ...state, sortedBy: "gender" })}>
            Gender
          </h4>
          <h4 onClick={() => setState({ ...state, sortedBy: "phone" })}>
            Phone
          </h4>
        </div>

        <div className="user-list__data-table">
          {paginatedData(
            state.usersForDataTable,
            paginationConfig.usersPerPage,
            paginationConfig.activePage
          ).map((data) => {
            return (
              <div key={data.email} className="user-list__data-table--data">
                <p>{`${data.name}`}</p>
                <p className="email">{data.email}</p>
                <p>{data.gender}</p>
                <p>{data.phone}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pagination flex items-center">
        <ul>
          {[...Array(paginationConfig.numberOfPages)].map((e, i) => (
            <li
              onClick={() =>
                setPaginationConfig({ ...paginationConfig, activePage: i + 1 })
              }
              className={paginationConfig.activePage === i + 1 ? "active" : ""}
              key={i}
            >
              {i + 1}
            </li>
          ))}
        </ul>

        <select
          onChange={(e) => {
            setPaginationConfig({
              ...paginationConfig,
              usersPerPage: parseInt(e.target.value),
            });
          }}
          defaultValue={paginationConfig.usersPerPage}
        >
          <option value="" disabled="disabled">
            Show Items
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default List;
