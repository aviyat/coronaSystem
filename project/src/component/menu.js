import React, { useEffect } from 'react';
import './menu.css'
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import AddMember from './addMember';

function mapStateToProps(state) {
    return { member: state.member }
}

export default connect(mapStateToProps, null)(
    function Menu(props) {
        const { member, getMembers } = props
        useEffect(() => {
            console.log(member);
        }, [])

        return (
            <>
                <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>

                    <div className={"collapse navbar-collapse"} id="navbarNavDropdown">
                        <img
                            src="img\hospitalLogo3.jpg"
                            className="logo"
                            alt=" logo"
                        />
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <AddMember getMembers={getMembers} />
                            </Navbar.Text>
                        </Navbar.Collapse>
                       

                    </div>
                </nav>

            </>
        )
    })

