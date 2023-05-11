
import './members.css'
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Menu from './menu';
import Container from 'react-bootstrap/esm/Container';
import imgUrl from './image/profil2.jpg'




export default (function MemberList(props) {
  const [allMembers, setAllMembers] = useState([]);
  const [chosenP, setChosenP] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dosesArray, setDosesVaccination] = useState();
  const [datePositiveResult, setDatePositiveResult] = useState();
  const [dateRecovery, setDateRecovery] = useState();
  const [img, setImg] = useState(imgUrl);


  const handleClockDetailsLink = (item) => {
    handleShow()
    setChosenP(item)
    getVaccinattionByMember(item)
  }

  useEffect(() => {
    getMembers();
  }, []);
  async function getMembers() {

    const response = await axios.get('http://localhost:3500/getAllMembers');
    setAllMembers(response.data);
  }
  const getVaccinattionByMember = async (item) => {
    debugger

    const { data } = await axios.get(`http://localhost:3500/getVaccinattionByMember/${item.id}`)
    console.log(data);
    setDosesVaccination(() => (data?.vaccinattion?.[0]?.dosesVaccination) ? data?.vaccinattion?.[0]?.dosesVaccination : "");
    setDatePositiveResult(() => (data?.vaccinattion?.[0]?.datePositiveResult) ? data?.vaccinattion?.[0]?.datePositiveResult : "");
    setDateRecovery(() => (data?.vaccinattion?.[0]?.dateRecovery) ? data?.vaccinattion?.[0]?.dateRecovery : "");

  }

  const onChangeHandlerImg = (event) => {
    const reader = new FileReader();
    const file = event;
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
    var fileToUpload = event
    var myFile = new FormData();
    myFile.append("file", fileToUpload);
  }


  return (
    <>
      <Menu getMembers={getMembers}></Menu>

      <h1 className='title_site'>Membres Hospital</h1>
      <div className="row w-100 d-flex justify-content-around">

        {


          allMembers.map(item => {
            return (
              <>

                <div className="card col-3" >
                  <div className="card-body">
                    <br />
                    <h5 className="card-text">NAME: {item.memberFirstName} {item.memberLastName}</h5>
                    <p className="card-text">ID:{item.id}</p>
                    <button type="button" onClick={() => handleClockDetailsLink(item)} id="btn_details" class="button is-small is-danger" data-toggle="modal" data-target="#exampleModal">
                      member details </button>
                    <br></br>   <br></br>

                  </div>
                </div>

              </>)
          })

        }

      </div>


      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>
              < div className='nameMemberCard'>
                {chosenP && chosenP.memberFi}</div></h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body class="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <form className='package-img-div row' noValidate autoComplete="off" style={{
                  display: 'flex'
                }}>
                  <label className='lable-upload-img' for="profileImg">
                    <div className='icon-add-img'>+ add image</div>
                    {img !== '' && <img className={img !== '' ? "package-img-img" : ''} referrerpolicy="no-referrer" src={img} />}
                  </label>
                  <input
                    type={"file"}
                    id="profileImg"
                    htmlFor="myInput"
                    accept="image/*"
                    style={{
                      display: 'none',
                      cursor: 'pointer'
                    }}
                    onChange={(e) => onChangeHandlerImg(e.target.files[0])}
                  /></form>
                <h6 className="modal-title " id="exampleModalLabel">Id : {chosenP && chosenP.id} </h6><br />
                <h6 className="modal-title " id="exampleModalLabel">First Name : {chosenP && chosenP.memberFirstName} </h6><br />
                <h6 className="modal-title " id="exampleModalLabel">Last Name : {chosenP && chosenP.memberLastName} </h6><br />
                <h6 className="modal-title " id="exampleModalLabel">BornDate : {chosenP && chosenP.bornDate}  </h6><br />
                <h6 className="modal-title " id="exampleModalLabel">Adress : {chosenP?.adress?.city && chosenP?.adress?.city+","} {chosenP?.adress?.street && chosenP?.adress?.street+","} {chosenP?.adress?.numberB && chosenP?.adress?.numberB}</h6><br />
                <h6 className="modal-title " id="exampleModalLabel">Phone : {chosenP && chosenP.phone}</h6><br />
                <h6 className="modal-title " id="exampleModalLabel">MobilePhone : {chosenP && chosenP.mobilePhone}</h6><br />
              </Col>
              <Col xs={12} md={6}>
                <br></br>
                <h5 class="title2">Covid19 Details:</h5>
                <div>
                  <br />
                  <h6 class="modal-title " id="exampleModalLabel">Doses Vaccination: <br />{dosesArray && dosesArray.map(x =>
                    <>Date vaccination:{x.date}<br />
                      Manufacturer vaccination:{x.p}
                      <br /></>)}
                  </h6><br />
                </div>
                <h6 class="modal-title " id="exampleModalLabel">Date Positive Result: {datePositiveResult && datePositiveResult}</h6><br />
                <h6 class="modal-title " id="exampleModalLabel">Date Recovery: {dateRecovery && dateRecovery}</h6> <br />
                {/* </div> */}

              </Col>

            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )

}


)



