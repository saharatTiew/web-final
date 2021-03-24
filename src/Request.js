import React, { useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import config from './config'
import { useHistory
} from "react-router-dom";

// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}
const firestore = firebase.firestore()
const auth = firebase.auth()


export default function Request() {
    const history = useHistory();
    const parkingRef = firestore.collection('parkinglot');
    const { register, handleSubmit, control, watch, errors } = useForm();
    const [isRedirect, setIsRedirect] = useState(false)

    const onSubmit = async (data) => {
        console.log('onSubmit', data)
        let preparedData = {
            name: data.name,
            createdAt: new Date(),
            phoneNumber: data.phoneNumber,
            arrivalTime: new Date(data.arrivalTime),
            departureTime: new Date(data.departureTime),
            reason: data.reason
        }
        await parkingRef
            .add(preparedData)
            .then(() => setIsRedirect(true))
            .catch((error) => {
                console.error("Errror:", error)
                alert(error)
            })

        if ({ isRedirect }) {
            console.log("hey");
            history.push("/report");
        } else {
            alert("error!");
        }
    }
    console.log(errors);

    return (
        <div style={{ "marginLeft": 20 + '%', "marginRight": 20 + '%', "marginTop": 3 + '%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={2}>
                        <label>Name*:</label>
                    </Col>
                    <Col>
                        <input type="text" placeholder="Name" ref={register({ required: true })} name="name" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <label>Phone number*:</label>
                    </Col>
                    <Col>
                        <input type="tel" placeholder="0826364525" ref={register(
                            {
                                required: true,
                                pattern: /[0]{1}[0-9]{9}/
                            })} name="phoneNumber" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <label>Arrival Time*:</label>
                    </Col>
                    <Col>
                        <TextField
                            type="datetime-local"
                            defaultValue="2021-03-24T12:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({ required: true })}
                            name="arrivalTime"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <label>Departure Time*:</label>
                    </Col>
                    <Col>
                        <TextField
                            type="datetime-local"
                            defaultValue="2021-03-24T12:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({ required: true })}
                            name="departureTime"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <label>Reason*:</label>
                    </Col>
                    <Col>
                        <input type="text" placeholder="Reason" ref={register({ required: true })} name="reason" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="submit">Submit</button>
                    </Col>
                </Row>

            </form>
        </div>
    )
}