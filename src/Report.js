import { useState, useEffect } from 'react'
import { Button} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { format } from 'date-fns'
import { BsPlus, BsTrash} from "react-icons/bs";
import config from './config'
import {
  Link
} from "react-router-dom";

// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}
const firestore = firebase.firestore()
const auth = firebase.auth()


export default function Journal() {
    const [records, setRecords] = useState([])
    
    // Firebase stuff
    const parkinglot = firestore.collection('parkinglot');
    const query = parkinglot.orderBy('createdAt', 'asc').limitToLast(100);
    const [data] = useCollectionData(query, { idField: 'id' });

    console.log("REACT_APP_PROJECT_ID", process.env.REACT_APP_PROJECT_ID)

    // This will be run when 'data' is changed.
    useEffect(() => {
        if (data) { // Guard condition
            let t = 0
            let r = data.map((d, i) => {
                // console.log('useEffect', format(d.createdAt.toDate(), "yyyy-MM-dd"))
                t += d.amount
                return (
                    <JournalRow
                        key={i}
                        data={d}
                        i={i}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })

            setRecords(r)
        }
    }, [data])


    const handleDeleteClick = (id) => {
        console.log('handleDeleteClick in Journal', id)
        if (window.confirm("Are you sure to delete this record?"))
            parkinglot.doc(id).delete()
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Parking Report</h1>
                    <Link to="/request">
                        <Button variant="outline-dark" >
                            <BsPlus /> Add
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Submitted Date</th>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {records}
                </tbody>
            </Table>

        </Container>
    )
}

function JournalRow(props) {
    let d = props.data
    let i = props.i
    console.log("JournalRow", d)
    console.log(d.description)
    return (
        <tr>
            <td>
                <BsTrash onClick={() => props.onDeleteClick(d.id)} />
            </td>
            <td>{format(d.createdAt.toDate(), "yyyy-MM-dd")}</td>
            <td>{d.name}</td>
            <td>{d.phoneNumber}</td>
            <td>{format(d.arrivalTime.toDate(), "yyyy-MM-dd HH:mm")}</td>
            <td>{format(d.departureTime.toDate(), "yyyy-MM-dd HH:mm")}</td>
            <td>{d.reason}</td>
        </tr>
    )
}