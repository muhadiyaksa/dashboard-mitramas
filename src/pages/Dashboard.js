import React, { useEffect, useState } from "react";
import Navigation from "../parts/Navigation";
import Button from "../element/Button";
import PeopleFoto from "../assets/image/people-foto.png";
import BuildingFoto from "../assets/icon/gedung.jpg";
import LogoMitramas from "../assets/icon/logo_mitramas.jpg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = () => {
    showSearch === false ? setShowSearch(true) : setShowSearch(false);
  };

  const handleShowNavigation = () => {
    const navigation = document.querySelector(".navigation");
    navigation.classList.remove("hidden");
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="dashboard">
          <Navigation />
          <div className="dashboard-header">
            <div className="d-flex align-items-center">
              <Button className="btn p-0 border-0 shadow-none d-sm-none" onClick={handleShowNavigation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
              <p className="me-4 d-none d-md-block">Perusahaan</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right d-none d-md-block" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
              <p className={`nama-perusahaan fw-bolder ${showSearch === false ? "" : "d-none d-sm-block"}`}>Mitramas Infosys Global</p>
            </div>
            <div className="d-flex align-items-center">
              <input type="text" name="search" className={`me-3 p-0  ${showSearch === false ? "d-none" : ""}`} />
              <Button className="btn p-0 border-0" onClick={handleShowSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search " viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell " viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
              <div className="image me-2">
                <img src={PeopleFoto} alt="" />
              </div>
              <p className="fw-bolder d-none d-md-block">John Doe</p>
            </div>
          </div>

          <div className="dashboard-information">
            <div className="box box1 info-profil">
              <div className="image">
                <img src={BuildingFoto} alt="" />
              </div>
              <div className="image2">
                <img src={LogoMitramas} alt="" />
              </div>
              <div className="identitas p-3">
                <div className="text-center mb-3">
                  <p className="fw-bolder fs-6">Mitramas Infosys Global</p>
                  <span className="d-block mb-3">Layanan IT</span>
                  <Button className="btn p-0 text-tealness d-inline-flex align-items-center px-3 shadow-none border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square me-2" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                    <p className="m-0 text-tealness">Sunting Profil</p>
                  </Button>
                </div>
                <label htmlFor="status">Status Perusahaan</label>
                <div id="status" className="d-flex justify-content-between">
                  <p className="text-tealness fw-bold">Aktif</p>
                  <div className="form-check form-switch">
                    <input className="form-check-input shadow-none" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                  </div>
                </div>
                <label htmlFor="singkatan">Singkatan</label>
                <p className="fw-bold">MIG</p>

                <label htmlFor="alamat">Alamat Perusahaan</label>
                <p>Jl. Tebet Raya No.42, Jakarta Selatan</p>

                <label htmlFor="pic">Penanggung Jawab {"(PIC)"}</label>
                <p>John Doe</p>

                <label htmlFor="pkp">Tanggal PKP</label>
                <p>03 Maret 2021</p>

                <label htmlFor="pkp">E-mail</label>
                <div className="d-flex align-items-center text-tealness mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope me-2" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  <Button type="link" href="mailto:" isExternal className="btn p-0 text-tealness border-0 shadow-none text-decoration-underline">
                    mig@mitrasolusi.group
                  </Button>
                </div>

                <label htmlFor="pkp">No. Telp</label>
                <div className="d-flex align-items-center text-tealness mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone me-2" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                  <Button type="link" href="tel:" isExternal className="btn p-0 text-tealness border-0 shadow-none ">
                    021-5678-1234
                  </Button>
                </div>

                <label htmlFor="pkp">Situs Web</label>
                <div className="d-flex align-items-center text-tealness mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe2 me-2" viewBox="0 0 16 16">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                  </svg>
                  <Button type="link" href="https://mitramas.com" isExternal className="btn p-0 text-tealness border-0 shadow-none text-decoration-underline">
                    mitramas.com
                  </Button>
                </div>
              </div>
            </div>

            <div className="box box2 info-lokasi">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="fs-5  m-0 fw-bold">Lokasi</p>
                <Button type="link" href="/" className="btn p-0 text-teal border-0 shadow-none">
                  Lihat Semua
                </Button>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="item-info-lokasi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-building d-xl-inline-block d-md-none" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                      />
                      <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                    </svg>
                    <div className="text-xl-end text-md-center text-end w-100">
                      <p>20</p>
                      <span>Induk</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="item-info-lokasi dua">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-wrench d-xl-inline-block d-md-none" viewBox="0 0 16 16">
                      <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z" />
                    </svg>
                    <div className="text-xl-end text-md-center text-end w-100">
                      <p>2</p>
                      <span>Sublokasi level 1</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="item-info-lokasi tiga">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-house-fill d-xl-inline-block d-md-none" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                    <div className="text-xl-end text-md-center text-end w-100">
                      <p>2</p>
                      <span>Sublikasi level 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box box3 info-bank">
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-5  m-0 fw-bold">Akun Bank</p>
                <Button isPrimary className=" px-2  border-0 shadow-none">
                  + Tambah <span className="d-sm-none d-md-inline-block">Akun Bank</span>
                </Button>
              </div>
              <div className="list">
                <div className="item-info-bank">
                  <div className="image">
                    <img src="" alt="" />
                  </div>
                  <div className="d-flex flex-column justify-content-between w-100">
                    <div className="d-flex justify-content-between ">
                      <p className="mb-0 fw-bolder">Bank KB Bukopin</p>
                      <div className="event">
                        <Button className="btn p-0 me-1 text-tealness border-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square me-2" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </Button>
                        <Button className="btn p-0 me-1 text-danger border-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="detail">
                      <span>021311244124142 - Yusron Taufiq</span>
                      <span>IDR</span>
                    </div>
                  </div>
                </div>
                <div className="item-info-bank">
                  <div className="image">
                    <img src="" alt="" />
                  </div>
                  <div className="d-flex flex-column justify-content-between w-100">
                    <div className="d-flex justify-content-between ">
                      <p className="mb-0 fw-bolder">Citibank, NA</p>
                      <div className="event">
                        <Button className="btn p-0 me-1 text-tealness border-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square me-2" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </Button>
                        <Button className="btn p-0 me-1 text-danger border-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="detail">
                      <span>021311244124142 - Asep</span>
                      <span>USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box box4 info-relasi">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <p className="fs-5  m-0 fw-bold">Relasi</p>
                <Button type="link" href="/" className="btn p-0 text-teal border-0 shadow-none">
                  Lihat semua
                </Button>
              </div>
              <div className="item-info-relasi">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
                <div className="detail-relasi">
                  <p>20</p>
                  <span>memiliki</span>
                </div>
              </div>
              <div className="item-info-relasi">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
                <div className="detail-relasi">
                  <p>108</p>
                  <span>menggunakan</span>
                </div>
              </div>
              <div className="item-info-relasi">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
                <div className="detail-relasi">
                  <p>67</p>
                  <span>meminjam</span>
                </div>
              </div>
            </div>

            <div className="box box5 info-aktifitas">
              <p className="fs-5  m-0 fw-bold">Aktivitas</p>
              <div className="list">
                <div className="item-info-aktifitas">
                  <p>Asep baru saja menambahkan Lokasi baru kantor Cabang Jagakarsa</p>
                  <span>Hari ini, 06:00</span>
                </div>
                <div className="item-info-aktifitas">
                  <p>Bulan baru saja menghapus sublokasi KCP Tebet 4 dari Induk kantor Cabang Pusat</p>
                  <span>Hari ini, 06:00</span>
                </div>
                <div className="item-info-aktifitas">
                  <p>Asep melakukan perubahan profil pada induk Kantor Cabang Bekasi</p>
                  <span>Hari ini, 06:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
