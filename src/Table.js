import Icon from '@material-ui/core/Icon';
import { Table } from 'react-bootstrap'
import Category from './Category';

export default function MyTable() {
    return (
        <div>
            {/* <Table striped borderless hover responsive>
                <thead>
                    <tr>
                        <th style={{ "width": 20 + '%' }}>First name</th>
                        <th style={{ "width": 20 + '%' }}>Last name</th>
                        <th style={{ "width": 25 + '%' }}>Major</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                </tbody>
            </Table> */}
            <Category />
        </div>
    )
}