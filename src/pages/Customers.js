import React, { useState, useEffect } from "react";
import Navigation from "../parts/Navigation";
import Axios from "axios";
import CustomerImg from "../assets/image/customers.png";
import Button from "../element/Button";
import ModalElement from "../element/ModalElement";
import WarningIcon from "../assets/icon/warning.png";
import AlertIcon from "../assets/icon/alert.png";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

export default function Customers() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userTestData = useSelector((state) => state.user);
  const userTestObj = JSON.parse(localStorage.getItem("usertest"));

  const [arrayCustomers, setArrayCustomers] = useState([]);
  const [arrayCustomersFilter, setArrayCustomersFilter] = useState({ active: [], nonActive: [], filter: [] });
  const [detailArrayCustomers, setDetailArrayCustomers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dataEmpty, setDataEmpty] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [isSpinnerDelete, setIsSpinnerDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [valueDataCustomers, setValueDataCustomers] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getArrayCustomers();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleShowModalCreate = (e) => {
    if (e === undefined) {
      setValueDataCustomers({});
    } else {
      let dataFilter = arrayCustomers.filter((el) => el.id === parseInt(e.target.getAttribute("idcus")));
      setValueDataCustomers({
        id: dataFilter[0].id,
        name: dataFilter[0].name,
        phone_number: dataFilter[0].phone_number,
        status: dataFilter[0].status,
        address: dataFilter[0].address,
        country: dataFilter[0].country,
        job_title: dataFilter[0].job_title,
      });
    }
    setShow(true);
  };

  const handleCloseModalCreate = () => {
    setShow(false);
  };

  const handleShowModalDelete = (e) => {
    setValueDataCustomers({ ...valueDataCustomers, id: e.target.getAttribute("idcus"), name: e.target.getAttribute("namecus") });
    setShowDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowDelete(false);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  const createOrUpdateEvent = () => {
    setIsSpinner(true);
    if (!valueDataCustomers?.id) {
      Axios({
        method: "POST",
        data: {
          name: valueDataCustomers.name,
          address: valueDataCustomers.address,
          country: valueDataCustomers.country,
          phone_number: valueDataCustomers.phone_number,
          job_title: valueDataCustomers.job_title,
          status: valueDataCustomers.status,
        },
        url: "https://mitramas-test.herokuapp.com/customers",

        headers: {
          Authorization: `${userTestObj.access_token}`,
        },
      })
        .then((res) => {
          if (res.data.success === true) {
            setIsSpinner(false);
            getArrayCustomers();
            setShow(false);
            setShowInfo(true);
          }
        })
        .catch((error) => {
          if (error.response.status) {
            handleLogout();
          }
        });
    } else {
      Axios({
        method: "PUT",
        data: {
          id: valueDataCustomers.id,
          name: valueDataCustomers.name,
          address: valueDataCustomers.address,
          country: valueDataCustomers.country,
          phone_number: valueDataCustomers.phone_number,
          job_title: valueDataCustomers.job_title,
          status: valueDataCustomers.status,
        },
        url: "https://mitramas-test.herokuapp.com/customers",

        headers: {
          Authorization: `${userTestObj.access_token}`,
        },
      })
        .then((res) => {
          if (res.data.success === true) {
            setIsSpinner(false);
            getArrayCustomers();
            setShow(false);
            setShowInfo(true);
          }
        })
        .catch((error) => {
          if (error.response.status) {
            handleLogout();
          }
        });
    }
  };

  const deleteEvent = () => {
    setIsSpinnerDelete(true);
    Axios({
      method: "DELETE",
      data: {
        id: parseInt(valueDataCustomers.id),
      },
      url: "https://mitramas-test.herokuapp.com/customers",

      headers: {
        Authorization: `${userTestObj.access_token}`,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          setIsSpinnerDelete(false);
          getArrayCustomers();
          setShowDelete(false);
          setShowInfo(true);
        }
      })
      .catch((error) => {
        if (error.response.status) {
          handleLogout();
        }
      });
  };

  const getArrayCustomers = () => {
    setSearchValue("");
    setIsLoading(true);
    Axios({
      method: "GET",
      url: "https://mitramas-test.herokuapp.com/customers",
      headers: {
        Authorization: `${userTestObj.access_token}`,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          let sortData = [...res.data.data];
          sortData.sort(function (a, b) {
            if (new Date(a.updated_at) > new Date(b.updated_at)) {
              return -1;
            } else if (new Date(a.updated_at) < new Date(b.updated_at)) {
              return 1;
            } else {
              return 0;
            }
          });
          setArrayCustomers(sortData);
          let dataActive = res.data.data.filter((el) => el.status === true);
          let dataNonActive = res.data.data.filter((el) => el.status === false);
          setDetailArrayCustomers({ dataActive: dataActive.length, dataNonActive: dataNonActive.length });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status) {
          handleLogout();
        }
      });
  };
  const sortByNew = () => {
    let data = (arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0) ? [...arrayCustomersFilter.active, ...arrayCustomersFilter.nonActive] : [...arrayCustomers];
    data.sort(function (a, b) {
      if (new Date(a.updated_at) > new Date(b.updated_at)) {
        return -1;
      } else if (new Date(a.updated_at) < new Date(b.updated_at)) {
        return 1;
      } else {
        return 0;
      }
    });
    if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
      if (arrayCustomersFilter.active.length > 0) {
        setArrayCustomersFilter({ ...arrayCustomersFilter, active: data });
      } else {
        setArrayCustomersFilter({ ...arrayCustomersFilter, nonActive: data });
      }
    } else {
      setArrayCustomers(data);
    }
  };

  const sortByOld = () => {
    let data = (arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0) ? [...arrayCustomersFilter.active, ...arrayCustomersFilter.nonActive] : [...arrayCustomers];
    data.sort(function (a, b) {
      if (new Date(a.updated_at) > new Date(b.updated_at)) {
        return 1;
      } else if (new Date(a.updated_at) < new Date(b.updated_at)) {
        return -1;
      } else {
        return 0;
      }
    });
    if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
      if (arrayCustomersFilter.active.length > 0) {
        setArrayCustomersFilter({ ...arrayCustomersFilter, active: data });
      } else {
        setArrayCustomersFilter({ ...arrayCustomersFilter, nonActive: data });
      }
    } else {
      setArrayCustomers(data);
    }
  };

  const sortByNameAZ = () => {
    let data = (arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0) ? [...arrayCustomersFilter.active, ...arrayCustomersFilter.nonActive] : [...arrayCustomers];
    data.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
      if (arrayCustomersFilter.active.length > 0) {
        setArrayCustomersFilter({ ...arrayCustomersFilter, active: data });
      } else {
        setArrayCustomersFilter({ ...arrayCustomersFilter, nonActive: data });
      }
    } else {
      setArrayCustomers(data);
    }
  };
  const sortByNameZA = () => {
    let data = (arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0) ? [...arrayCustomersFilter.active, ...arrayCustomersFilter.nonActive] : [...arrayCustomers];
    data.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
      if (arrayCustomersFilter.active.length > 0) {
        setArrayCustomersFilter({ ...arrayCustomersFilter, active: data });
      } else {
        setArrayCustomersFilter({ ...arrayCustomersFilter, nonActive: data });
      }
    } else {
      setArrayCustomers(data);
    }
  };

  const filterForActive = (e) => {
    if (e.target.checked) {
      if ((arrayCustomersFilter.active.length === 0) ^ (arrayCustomersFilter.nonActive.length === 0)) {
        console.log("kesini");
        setArrayCustomersFilter({ active: [], nonActive: [], filter: [] });
      } else {
        console.log("kesini nih");
        let dataFilter = arrayCustomers.filter((el) => el.status === true);
        setArrayCustomersFilter({ ...arrayCustomersFilter, active: dataFilter });
      }
    } else {
      //true                                         //true
      if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
        setArrayCustomersFilter({ active: [], nonActive: [], filter: [] });
      } else {
        let dataFilter2 = arrayCustomers.filter((el) => el.status === false);
        setArrayCustomersFilter({ active: [], nonActive: dataFilter2, filter: [] });
      }
    }
  };
  const filterForNonActive = (e) => {
    if (e.target.checked) {
      if ((arrayCustomersFilter.active.length === 0) ^ (arrayCustomersFilter.nonActive.length === 0)) {
        setArrayCustomersFilter({ active: [], nonActive: [], filter: [] });
      } else {
        let dataFilter = arrayCustomers.filter((el) => el.status === false);
        setArrayCustomersFilter({ ...arrayCustomersFilter, nonActive: dataFilter });
      }
    } else {
      if ((arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)) {
        console.log("kesini apa ya");
        setArrayCustomersFilter({ active: [], nonActive: [], filter: [] });
      } else {
        console.log("kesini keknya");
        let dataFilter2 = arrayCustomers.filter((el) => el.status === true);
        setArrayCustomersFilter({ active: dataFilter2, nonActive: [], filter: [] });
      }
    }
  };

  const searchByName = () => {
    let dataFilter = arrayCustomers.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase()));
    if (dataFilter.length > 0) {
      setDataEmpty(false);
    } else {
      setDataEmpty(true);
    }
    setArrayCustomersFilter({ active: [], nonActive: [], filter: dataFilter });
  };

  const clearSearch = () => {
    setSearchValue("");
    setDataEmpty(false);
    setArrayCustomersFilter({ active: [], nonActive: [], filter: [] });
  };

  const showArrayCustomers = () => {
    if (isLoading === true) {
      return (
        <div className="animasi-load mx-auto text-center">
          <p className="mt-4 mb-3">Sedang Mempersiapkan Data, harap tunggu . . .</p>
          <div className="loading">
            <p>Loading</p>
          </div>
        </div>
      );
    } else {
      if (dataEmpty === true) {
        return (
          <div className="alert alert-danger" role="alert">
            Maaf, Data yang kamu cari tidak ada.
          </div>
        );
      } else {
        if (arrayCustomers?.length > 0) {
          let data =
            arrayCustomersFilter?.filter.length > 0
              ? arrayCustomersFilter.filter
              : (arrayCustomersFilter.active.length > 0) ^ (arrayCustomersFilter.nonActive.length > 0)
              ? [...arrayCustomersFilter.active, ...arrayCustomersFilter.nonActive]
              : arrayCustomers;
          console.log(data);
          let result = data.map((el) => {
            return (
              <div className="list-group-item">
                <div className="row align-items-center">
                  <div className=" col-md-9 mb-2">
                    <div className="row">
                      <div className="col-md">
                        <p className="name">
                          <span></span>
                          {el.name}
                        </p>
                        <p className="jobtitle">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person text-secondary me-2" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                          </svg>
                          <span className="text-tealness">{el.job_title}</span>
                        </p>
                        <p className="notelp">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone text-secondary me-2" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                          </svg>
                          <span className="text-tealness">{el.phone_number}</span>
                        </p>
                      </div>
                      <div className="col-md d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt text-secondary me-2 mt-2 " viewBox="0 0 16 16">
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        <p className="value-address">
                          {el.address}, <span className="d-block text-tealness fw-bold">{el.country}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="row align-items-center justify-content-center">
                      <div className="col col-md-auto">
                        <span className={`status ${el.status === true ? "active" : ""} `}>{el.status === true ? "Aktif" : "Tidak Aktif"}</span>
                      </div>
                      <div className="col col-md d-flex align-items-center justify-content-end mt-2">
                        <button className="btn p-0 me-1 text-tealness border-0" idcus={el.id} onClick={handleShowModalCreate}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square me-3" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button>
                        <button className="btn p-0 me-1 text-danger border-0" idcus={el.id} namecus={el.name} onClick={handleShowModalDelete}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
          return result;
        } else {
          return (
            <div className="alert alert-danger" role="alert">
              Ups, Sepertinya sistem kami bermasalah.
            </div>
          );
        }
      }
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="customers">
          <Navigation />
          <div className="customers-header">
            <img src={CustomerImg} alt="" className="d-none d-md-block img-fluid" />

            <div className="detail ">
              <h5>Rekapitulasi Jumlah Customers</h5>
              <div className="total d-lg-flex align-items-center">
                <p className="mb-0">Total seluruhnya Customers Saat ini berjumlah </p>
                <span> {detailArrayCustomers?.dataActive + detailArrayCustomers?.dataNonActive} orang</span>
              </div>
              <div className="d-flex">
                <div className="detail-item detail-active text-light">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check2-circle me-4" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>
                  <div>
                    <p>{detailArrayCustomers?.dataActive} Orang</p>
                    <span>Berstatus Aktif</span>
                  </div>
                </div>
                <div className="detail-item detail-non-active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-circle me-4" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  <div>
                    <p>{detailArrayCustomers?.dataNonActive} Orang</p>
                    <span>Berstatus Tidak Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="customers-body">
            <div className="row">
              <div className="col-md-3">
                <div className="customers-sort">
                  <p className="fw-bolder">Urutkan Data</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={sortByNew} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Terbaru
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={sortByOld} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Terlama
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={sortByNameAZ} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      A-Z
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={sortByNameZA} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Z-A
                    </label>
                  </div>
                </div>
                <div className="customers-filter mb-3">
                  <p className="fw-bolder">Saring Data</p>
                  <div className="form-check">
                    <input className="form-check-input shadow-none" type="checkbox" value="" id="flexCheckDefault" onChange={filterForActive} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Customer Aktif
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input  shadow-none" type="checkbox" value="" id="flexCheckChecked" onChange={filterForNonActive} />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                      Customer Tidak Aktif{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="customers-array">
                  <p className="fw-bolder">Data Customers</p>
                  <div className="row">
                    <div className="col-4">
                      <Button isPrimary onClick={handleShowModalCreate}>
                        + Tambah <span class="d-none d-md-inline-block">Data Customers</span>
                      </Button>
                    </div>
                    <div className="col-8">
                      <div className="input-group mb-3">
                        <input type="text" className="form-control shadow-none" placeholder="Cari Nama " value={searchValue} aria-describedby="button-addon2" onChange={(e) => setSearchValue(e.target.value)} />
                        <button className={`btn border-0 clear ${searchValue !== "" ? "" : "d-none"}`} onClick={clearSearch}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                        <button className="btn btn-outline-secondary d-inline-flex align-items-center shadow-none" type="button" id="button-addon2" onClick={searchByName}>
                          <span className="me-3 d-none d-md-inline-block">Cari</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="list-group">{showArrayCustomers()}</div>
                </div>
              </div>
            </div>
          </div>
          <ModalElement show={show} size="lg" funcModal={handleCloseModalCreate} heading="Data Customers" isHeader isFooter isSpinner={isSpinner} funcSave={createOrUpdateEvent}>
            <label htmlhtmlFor="name" className="fw-bold mb-2">
              Nama Customers
            </label>
            <input
              type="text"
              id="name"
              className="form-control py-2 px-3 mb-4 shadow-none"
              placeholder="Masukan nama"
              defaultValue={valueDataCustomers.name}
              onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, name: e.target.value })}
            />
            <label htmlhtmlFor="job_title" className="fw-bold mb-2">
              Posisi Pekerjaan
            </label>
            <input
              type="text"
              id="job_title"
              className="form-control py-2 px-3 mb-4 shadow-none"
              placeholder="Masukan Posisi atau Jobdesk Pekerjaan"
              defaultValue={valueDataCustomers?.job_title}
              onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, job_title: e.target.value })}
            />
            <label htmlhtmlFor="phone_number" className="fw-bold mb-2">
              Nomer Telepon
            </label>
            <input
              type="text"
              id="phone_number"
              className="form-control py-2 px-3 mb-4 shadow-none"
              placeholder="Masukan Nomor telephone"
              defaultValue={valueDataCustomers?.phone_number}
              onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, phone_number: e.target.value })}
            />
            <label htmlhtmlFor="address" className="fw-bold mb-2">
              Alamat
            </label>
            <input
              type="text"
              id="address"
              className="form-control py-2 px-3 mb-4 shadow-none"
              placeholder="Masukan Alamat"
              defaultValue={valueDataCustomers?.address}
              onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, address: e.target.value })}
            />
            <label htmlhtmlFor="country" className="fw-bold mb-2">
              Negara
            </label>
            <input
              type="text"
              id="country"
              className="form-control py-2 px-3 mb-4 shadow-none"
              placeholder="Masukan Negara"
              defaultValue={valueDataCustomers?.country}
              onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, country: e.target.value })}
            />
            <label className="fw-bold mb-2">Status</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                defaultChecked={valueDataCustomers?.status}
                onChange={(e) => setValueDataCustomers({ ...valueDataCustomers, status: e.target.value })}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                Aktif
              </label>
            </div>
          </ModalElement>
          <ModalElement show={showDelete} size="md" data-cy="modal-delete">
            <div className="text-center p-4">
              <img src={WarningIcon} alt="" className="mb-5" data-cy="modal-delete-icon" />
              <p className="fs-5 mb-5" data-cy="modal-delete-title">
                Apakah kamu yakin akan menghapus Data Customer dari <strong>{valueDataCustomers.name}</strong>?
              </p>
              <div className="d-flex justify-content-center">
                <Button isGray className="px-4 rounded-pill me-3" onClick={handleCloseModalDelete} data-cy="modal-delete-cancel-button">
                  Batal
                </Button>
                <Button isRed className="px-4 rounded-pill d-inline-flex align-items-center" onClick={deleteEvent} data-cy="modal-delete-confirm-button">
                  <span>Hapus</span>
                  {isSpinnerDelete === true ? <span className="lds-dual-ring"></span> : ""}
                </Button>
              </div>
            </div>
          </ModalElement>
          <ModalElement show={showInfo} size="md" funcModal={handleCloseInfo} data-cy="modal-information">
            <div className="row px-4 align-items-center">
              <div className="col-auto">
                <img src={AlertIcon} alt="" data-cy="modal-information-icon" />
              </div>
              <div className="col">
                <p className="fs-5 m-0" data-cy="modal-information-title">
                  Data telah diperbaharui
                </p>
              </div>
            </div>
          </ModalElement>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
