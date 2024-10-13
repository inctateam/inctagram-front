import { FC } from 'react'

type TableData = {
  dateOfPayment: string
  endDateOfPayment: string
  paymentType: string
  price: number
  subscriptionType: string
}

type TableProps = {
  data: TableData[]
}

export const Table: FC<TableProps> = ({ data }) => {
  return (
    <>
      <table className={'max-w-[972px] w-full mx-auto'}>
        <thead>
          <tr className={'bg-[#171717] text-sm'}>
            <th className={'text-left py-3 pl-5'}>Date of Payment</th>
            <th className={'text-left w-[210px]'}>End date of subscription</th>
            <th className={'text-right w-[150px] pr-[80px]'}>Price</th>
            <th className={'text-left'}>Subscription Type</th>
            <th className={'text-left'}>Payment Type</th>
          </tr>
        </thead>
        <tbody className={''}>
          {/*Заглушка*/}
          <tr className={'text-sm border border-t-0 border-dark-500'}>
            <td className={'py-3 pl-5'}>12.12.2022</td>
            <td className={'py-3'}>12.12.2022</td>
            <td className={'py-3 text-right pr-[80px]'}>$10</td>
            <td className={'py-3'}>1 day</td>
            <td className={'py-3'}>Stripe</td>
          </tr>

          {/*Для будущих данных*/}

          {/* {data.map((data, index) => {
            return (
              <tr className={'text-sm border border-t-0 border-dark-500'} key={index}>
                <td className={'py-3 pl-5'}>
                  {new Date(data.dateOfPayment).toLocaleDateString('ru-RU')}
                </td>
                <td className={'py-3'}>
                  {new Date(data.endDateOfPayment).toLocaleDateString('ru-RU')}
                </td>
                <td className={'py-3 text-right pr-[80px]'}>{`$${data.price}`}</td>
                <td className={'py-3'}>{data.subscriptionType}</td>
                <td className={'py-3'}>{data.paymentType}</td>
              </tr>
            )
          })} */}
        </tbody>
      </table>
    </>
  )
}
