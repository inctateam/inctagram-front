import { TableBody } from './table-body'
import { TableCell } from './table-cell'
import { TableContainer } from './table-container'
import { TableHead } from './table-head'
import { TableRow } from './table-row'

type TableData = {
  dateOfPayment: string
  endDateOfPayment: string
  paymentType: string
  price: number
  subscriptionType: string
}

type Props = {
  data: TableData[]
}

export const Table = ({ data }: Props) => {
  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow isHeader>
            <TableCell>Date of Payment</TableCell>
            <TableCell>End date of subscription</TableCell>
            <TableCell align={'right'}>Price</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Payment Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*Заглушка*/}

          <TableRow>
            <TableCell>12.12.2022</TableCell>
            <TableCell>12.12.2022</TableCell>
            <TableCell align={'right'}>$10</TableCell>
            <TableCell>1 day</TableCell>
            <TableCell>Stripe</TableCell>
          </TableRow>

          {/*Для будущих данных*/}

          {/* {data.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(data.dateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{new Date(data.endDateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell align={'right'}>{`$${data.price}`}</TableCell>
              <TableCell>{data.subscriptionType}</TableCell>
              <TableCell>{data.paymentType}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </TableContainer>
    </>
  )
}
