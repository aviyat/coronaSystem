import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './members.css'
import imgUrl from './image/profil2.jpg'
import moment from 'moment';


function mapStateToProps(state) {
    return {
        memberState: state.member
    }
}

const mapDispatcToProps = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatcToProps)(function AddVaccination(props) {
    const { getMembers } = props;
    const [show, setShow] = useState(false);
    const [amountDoses, setAmountDoses] = useState([1]);
    const [iDoses, setIDoses] = useState(2);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [memberFirstName, setMemberFirstName] = useState();
    const [memberLastName, setMemberLastName] = useState();
    const [_id, setId] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [numberB, setNumberB] = useState();
    const [bornDate, setBornDate] = useState("");
    const [phone, setPhone] = useState();
    const [mobilePhone, setMobilePhone] = useState();
    // const [DoseDate, setDoseDate] = useState();
    // const [producerName, setproducerName] = useState();
    const [datePositiveResult, setdatePositiveResult] = useState();
    const [dateRecovery, setDateRecovery] = useState();
    const [showVaccination, setshowVaccination] = useState();
    const [savedDose, setSavedDose] = useState(true);
    const [dateDose, setDateDose] = useState('');
    const [PDose, setPDose] = useState('');
    const [img, setImg] = useState(imgUrl);
    const [dosesArray, setDosesArray] = useState([]);
    const [err, setErr] = useState(false)
    const [validId, setValidId] = useState(true)
    const [validBornData, setValidBornData] = useState(true)
    const [validPhone, setValidPhone] = useState(true)




    function validateMobileNumber() {
        const regex = /^05\d([-]{0,1})\d{7}$/;
        return regex.test(phone);
    }
 
    const history = useHistory();
    const handleClickAddDose = () => {
        if (amountDoses.length < 4) {
            setIDoses(iDoses + 1);
            setAmountDoses([...amountDoses, iDoses])
            setSavedDose(true)

        }
        else {
            alert("The can't get more from 4 doses!!!!!!")
        }
    }
    const addDoseToArray = () => {
        debugger
        setDosesArray([...dosesArray, { date: dateDose, p: PDose }])
        setSavedDose(false)
    }

    function AddMember(e) {
        const currentDate = moment();
        const userBirthdate = moment(bornDate)
        debugger;
        if (_id?.length !== 9) {
            setValidId(false)
        }
        if (userBirthdate.isAfter(currentDate)) {
            setValidBornData(false)
        }
        if (!validateMobileNumber(phone)) {
            setValidPhone(false)
        }
        if (!memberFirstName||!memberLastName) {
            setErr(true)
            
        }
        


        else {
            setValidId(true)
            setValidBornData(true)
            setValidPhone(true)
            

            axios.get(`http://localhost:3500/getMemberById/${_id}`)
                .then((res) => {
                    if (res.data.message === "member not found") {


                        axios.post('http://localhost:3500/addMember', {
                            memberFirstName: memberFirstName,
                            memberLastName: memberLastName,
                            id: _id,
                            adress: { city: city, street: street, numberB: numberB },
                            bornDate: bornDate,
                            phone: phone,
                            mobilePhone: mobilePhone,

                        });
                        getMembers()
                        setshowVaccination(true);
                    }

                    else {

                        alert("this ID already exist")

                    }
                })
        }

    }




    const AddMemberToDB = () => {
       
        AddMember();

    }
    const saveVaccinationDetails = async () => {
        debugger
        axios.post('http://localhost:3500/addVaccinattion', {
            memberId: _id,
            dosesVaccination: dosesArray,
            datePositiveResult: datePositiveResult,
            dateRecovery: dateRecovery
        });
        setShow(false)
        history.push('/')
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

            <div style={{ cursor: 'pointer' }} className={"nav-link"} id={"add"} onClick={handleShow}><Button variant="light" size="lg">Add Member</Button></div>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='titleAdd'>Add Member: </Modal.Title>
                </Modal.Header>
                <Modal.Body>

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

                    <Form>
                        <Row className="mb-3"  >
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label className="label">Id </Form.Label>
                                <Form.Control
                                    className="input"
                                    type='Number'
                                    placeholder="Enter MemberId"
                                    value={_id}
                                    onChange={(e) => setId(e.target.value)}

                                />
                                {!validId && <span className='invalid-input'>enter valid ID</span>}

                            </Form.Group>

                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label className="label"> Born Date:</Form.Label>
                                <Form.Control
                                    aria-describedby="inputGroupPrepend"
                                    type="Date"
                                    placeholder="Enter BornDate"
                                    value={bornDate}
                                    onChange={(e) => setBornDate(e.target.value)}
                                />
                                {!validBornData && <span className='invalid-input'>enter BornDate</span>}

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label className="label">First Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter FirstName"
                                    value={memberFirstName}
                                    onChange={(e) => setMemberFirstName(e.target.value)}
                                />
                                {err && !memberFirstName && <span className='invalid-input'>enter First Name</span>}

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label className="label">Last Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter LastName"
                                    value={memberLastName}
                                    onChange={(e) => setMemberLastName(e.target.value)}
                                />
                                {err && !memberLastName && <span className='invalid-input'>enter Last Name </span>}
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label className="label">city: </Form.Label>
                                <Form.Control
                                    className="input"
                                    type="text"
                                    placeholder="Enter City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label className="label">street: </Form.Label>
                                <Form.Control
                                    className="input"
                                    type="text"
                                    placeholder="Enter Street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label className="label">HomeNumber: </Form.Label>
                                <Form.Control
                                    className="input"
                                    type="text"
                                    placeholder="Enter  HomeNumber"
                                    value={numberB}
                                    onChange={(e) => setNumberB(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="5" controlId="validationCustom01">
                                <Form.Label className="label">Phone: </Form.Label>
                                <Form.Control
                                    className="input"
                                    type="Number"
                                    placeholder="Enter phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {!validPhone && <span className='invalid-input'>enter valid phone</span>}


                            </Form.Group>
                            <Form.Group as={Col} md="5" controlId="validationCustom01">
                                <Form.Label className="label">Mobile-Phone:</Form.Label>
                                <Form.Control
                                    className="input"
                                    type="Number"
                                    placeholder="Enter mobilePhone"
                                    value={mobilePhone}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />

                            </Form.Group>
                        </Row>
                    </Form>

                    <Button variant="success" onClick={() => { AddMemberToDB() }}>Save and show more details</Button><br></br>
                    <div>
                        {showVaccination &&
                            <>


                                {amountDoses && amountDoses.map((item, index) =>
                                    <>

                                        <Form.Label>Dose number {item} </Form.Label>
                                        Date: <Form.Control type='date' onChange={(e) => setDateDose(e.target.value)} />
                                        Manufacturer:<select id="lang" onChange={(e) => setPDose(e.target.value)}>
                                            <option value="Pfizer">Pfizer</option>
                                            <option value="Moderna">Moderna</option>
                                            <option value="AstraZeneca">AstraZeneca</option>
                                            <option value="Novavax">Novavax</option>
                                        </select><br />

                                        <button onClick={() => addDoseToArray()}>save</button><br />

                                    </>
                                )}
                                <button disabled={savedDose} onClick={() => handleClickAddDose()}>+</button><br />

                                DatePositiveResult:: <Form.Control type='Date' onChange={(e) => setdatePositiveResult(e.target.value)} />
                                DateRecovery: <Form.Control type='Date' onChange={(e) => setDateRecovery(e.target.value)} />


                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => saveVaccinationDetails()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
))